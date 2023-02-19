import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Input, Div, Button, HorizontalScroll, TabsItem, View } from '@vkontakte/vkui';

const Profile = ({userId}) => {
    const [userWallet, setUserWallet] = useState('');
    const [status, setStatus] = useState('default');
    const [disabled, setDisabled] = useState(false);

    useEffect(() => {
		axios.get("http://localhost:8000/api/table")
        .then((responseFromServer) => {
            console.log(responseFromServer)
            setUserWallet(responseFromServer);
            setDisabled(true);
            setStatus('valid')
        }).catch((err) => {
            console.log(err);
        });
	}, [userWallet, disabled, status]);

    const sendUserWallet = () => {
        if (userWallet != '') {
            axios.post('http://localhost:8000/api/table', userId,{
                    headers: {
                        'Content-Type': `text/html; charset=utf-8`
                    }
                }).then((responseFromServer) => {
                    console.log(responseFromServer)
                    setStatus('valid')
                    setDisabled(true);
                }).catch((err) => {
                    console.log(err);
                    setStatus('error')
                });
            console.log('ok');
            
        }
    }

    return(
        <Div>
            <h2 className='selected__heading small' style={{marginBottom: '16px'}}>Введите номер своего кошелька.</h2>
                <Input
                status={status}
                value={userWallet}
                required 
                className='event-create__input'
                onChange={e => setUserWallet(e.target.value)}
                />
                <Button disabled={disabled} size="l" appearance="accent" mode="secondary" style={{marginBottom: '10px'}} onClick={() => sendUserWallet()}>
                Отправить
                </Button>
        </Div>
    )
};


export default Profile;