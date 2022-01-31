import React, {useState} from 'react';
import {$host} from './http'
import {Button, Card, Container, Form} from "react-bootstrap";

export const App = () => {
    const initialValues = {name: '', email: '', message: ''};
    const [formValues, setFormValues] = useState(initialValues);
    const [formErrors, setFormErrors] = useState({length:3});



    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
    };

    const blurHandler = (e) => {
        setFormErrors(validate(formValues));
        console.log(Object.keys(formErrors).length )
    }

    const validate = (values) => {
        const errors = {};
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
        if (!values.name) {
            errors.name = "Name is required!";
        }

        if (!values.email) {
            errors.email = "Email is required!";
        } else if (!regex.test(values.email)) {
            errors.email = "This is not a valid email format!";
        }
        if (!values.message) {
            errors.message = "Message is required";
        } else if (values.message.length < 4) {
            errors.message = "Message must be more than 4 characters";
        }
        return errors;
    };



    const sendForm = async (name, email, message) => {
        try {
            const result = await $host.post('forms', {name, email, message})
            return result
        } catch (e) {
            console.log('' + e)
        }
    }



    const click = async () => {
        try {
            const response = await sendForm(formValues.name, formValues.email, formValues.message)
            alert('Your message successful send')
            let inp = document.querySelectorAll("input")
            formValues.name = ''
            formValues.email = ''
            formValues.message = ''
            inp.forEach(e => {
                e.value = ''
            })
            let txt = document.querySelector("textarea")
            txt.value =  ''
        } catch (e) {
            console.log('' + e)
        }
    }

    return (
        <Container
            className="d-flex justify-content-center align-items-center"
            style={{height: window.innerHeight - 54}}
        >
            <Card style={{width: 600}} className="p-5">
                <h2 className="m-auto">Reach out to us!</h2>
                <Form className="d-flex flex-column">
                     <div style={{color: 'red'}}>{formErrors.name}</div>
                    <Form.Control
                        className="mt-2"
                        placeholder="Your name*"
                        name="name"
                        value={formValues.name}
                        onChange={handleChange}
                        onBlur={e => blurHandler(e)}

                    />
                    <div style={{color: 'red'}}>{formErrors.email}</div>
                    <Form.Control
                        className="mt-2"
                        placeholder="Your email*"
                        name="email"
                        value={formValues.email}
                        onChange={handleChange}
                        onBlur={e => blurHandler(e)}


                    />
                    <div style={{color: 'red'}}>{formErrors.message}</div>
                    <Form.Control as="textarea" rows={3}
                                  className="mt-2"
                                  placeholder="Your message*"
                                  value={formValues.message}
                                  name="message"
                                  onBlur={e => blurHandler(e)}
                                  onChange={handleChange}
                    />
                    <Button
                        className="mt-2 align-self-baseline"
                        variant="warning"
                        style={{borderRadius: '50px'}}
                        disabled={Object.keys(formErrors).length === 0? false : true}

                        onClick={click}
                    >
                        Send message
                    </Button>
                </Form>
            </Card>
        </Container>
    )

}