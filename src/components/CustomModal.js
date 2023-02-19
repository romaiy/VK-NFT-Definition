import React, { useState, useEffect } from 'react';
import axios from 'axios';
import bridge from '@vkontakte/vk-bridge';

import { Button, PopoutWrapper, ModalDismissButton, useAdaptivityConditionalRender, Input, Textarea} from '@vkontakte/vkui';
import { isArray } from '@vkontakte/vkjs';


const CustomModal = ({ onClose, userId, groupId }) => {
    const { sizeX } = useAdaptivityConditionalRender();
    const [wallet, setWallet] = useState('');
    const [NftKey, setNftKey] = useState(null);
    const [NftName, setNftName] = useState();
    

    useEffect(() => {
		axios.get("http://localhost:8000/api/table")
        .then((responseFromServer) => {
            console.log(responseFromServer)
            setNftKey(responseFromServer);
        }).catch((err) => {
            console.log(err);
        });
	}, [NftKey]);

    const pushNotifications = () => {
        bridge.send('VKWebAppCallAPIMethod', {
            method: 'notifications.sendMessage',
                params: {
                user_ids: userId,
                message: 'Вам отправили награду🎉',
                v: '5.131',
                access_token: '3c4ac4ae3c4ac4ae3c4ac4ae0c3f58712833c4a3c4ac4ae5fa54a2c68f8786d8482fce1'
                }})
                .then((data) => { 
                if (data.response) {
                }
                })
                .catch((error) => {
                    console.log(error);
                });
    }
    
    const sendNFT = () => {
        if ((wallet != null) && (NftName != '')) {
            axios.post('http://localhost:8000/api/table', wallet, {
                    headers: {
                        'Content-Type': `text/html; charset=utf-8`
                    }
                }).then((responseFromServer) => {
                    console.log(responseFromServer)
                    pushNotifications();
                }).catch((err) => {
                    console.log(err);
                });
            
        }
        if (wallet && NftName) {
            onClose();
        }
    }

    return (
        <PopoutWrapper onClick={onClose}>
        <div
            className='event-create'
            style={{
            backgroundColor: 'var(--vkui--color_background_content)',
            borderRadius: 8,
            position: 'relative',
            padding: '12px',
            }}
        >

            <h2 className='event-create__heading'>Введите номер кошелька</h2>
                <Input 
                value={wallet} 
                required 
                className='event-create__input'
                onChange={e => setWallet(e.target.value)}
                />
            <h2 className='event-create__heading'>Введите наименование NFT из списка</h2>
                <Input 
                value={NftName} 
                required 
                className='event-create__input'
                onChange={e => setNftName(e.target.value)}
                />

                <Button size="l" appearance="accent" mode="secondary" style={{marginBottom: '10px'}} onClick={() => sendNFT()}>
                Отправить
                </Button>
            
            {(isArray(NftKey)) ? 
            NftKey.map((item) => {
                return(
                    <div>{item.name}</div>
                )
            }) :
            <div className='modal'>Загрузка NFT...</div>
            }

            {sizeX.regular && (
            <ModalDismissButton className={sizeX.regular.className} onClick={onClose} />
            )}
        </div>
        </PopoutWrapper>
    );
};

export default CustomModal;