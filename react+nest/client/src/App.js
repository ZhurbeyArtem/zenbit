import React, {useEffect, useState} from 'react';
import {$host} from './http'
import {Button, Card, Container, Form} from "react-bootstrap";


export const App = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [message, setMessage] = useState('')

    const [nameDirty, SetNameDirty] = useState(false)
    const [emailDirty, SetEmailDirty] = useState(false)
    const [messageDirty, SetMessageDirty] = useState(false)

    const [nameError, SetNameError] = useState('name cannot be null')
    const [emailError, SetEmailError] = useState('email cannot be null')
    const [messageError, SetMessageError] = useState('message cannot be null')

    const [formValid, setFormValid] = useState(false)

    useEffect(()=>{
        if(emailError || nameError || messageError){
setFormValid(false)
        }
        else setFormValid(true)
    },[emailError,nameError, messageError])

    const emailHandler = (e) => {
      setEmail(e.target.value)
        const result = String(email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
      if (!result) SetEmailError('not correct email')
  else SetEmailError('')
    }

    const nameHandler = (e) => {
        setName(e.target.value)
      if(e.target.value.value < 2) {
          SetNameError('minimum name length 2')
          if(!e.target.value) SetNameError('name cannot be null')

      }

        else SetNameError('')
    }

    const messageHandler = (e) => {

        setMessage(e.target.value)
        if(e.target.value.value < 4) {
            SetMessageError('minimum message length 4')
            if(!e.target.value) SetMessageError('message cannot be null')

        }

        else SetMessageError('')
    }

    const blurHandler = (e) => {
      switch (e.target.name){
          case 'name': SetNameDirty(true)
              break
          case 'email': SetEmailDirty(true)
              break
          case 'message': SetMessageDirty(true)
              break
    }
}
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
        const response = await sendForm(name, email, message)
        alert('Your message successful send')
        setName('')
        setEmail('')
        setMessage('')

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
            <Form className="d-flex flex-column" required>
                { (nameDirty && nameError ) && <div style={{color:'red'}}>{nameError}</div>}
                <Form.Control
                    className="mt-2"
                    placeholder="Your name*"
                    value={name}
                    onChange={e => nameHandler(e)}
                    onBlur={e => blurHandler(e)}
                />
                {(emailDirty && emailError) && <div style={{color:'red'}} >{emailError}</div>}
                <Form.Control
                    className="mt-2"
                    placeholder="Your email*"
                    value={email}
                    onChange={e => emailHandler(e)}
                    onBlur={e => blurHandler(e)}


                />
                {(messageDirty && messageError) && <h6 style={{color:'red'}}>{messageError}</h6>}
                <Form.Control as="textarea" rows={3}
                              className="mt-2"
                              placeholder="Your message*"
                              value={message}
                              onChange={e => messageHandler(e)}
                              onBlur={e => blurHandler(e)}
                />
                <Button
                    className="mt-2 align-self-baseline"
                    variant="warning"
                    style={{borderRadius: '50px'}}
                    // disabled={!formValid}
                    disabled={!name || !message || !email}
                    onClick={click}
                >
                    Send message
                </Button>
            </Form>
        </Card>
    </Container>
)

}