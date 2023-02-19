import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, PopoutWrapper, ModalDismissButton, useAdaptivityConditionalRender, Input, Textarea} from '@vkontakte/vkui';
import { isArray } from '@vkontakte/vkjs';


const CustomModal = ({ onClose, userId }) => {
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
    
    const sendNFT = () => {
        if (wallet != null) {
            axios.post('http://localhost:8000/api/table', wallet, {
                    headers: {
                        'Content-Type': `text/html; charset=utf-8`
                    }
                }).then((responseFromServer) => {
                    console.log(responseFromServer)
                }).catch((err) => {
                    console.log(err);
                });
            
        }
        if (wallet) {
            onClose();
        }
    }

    const chooseNft = (name) => {
        setNftName(name);
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
                <Button size="l" appearance="accent" mode="secondary" style={{marginBottom: '10px'}} onClick={() => sendNFT()}>
                Отправить
                </Button>
            
            {(isArray(NftKey)) ? 
            NftKey.map((item) => {
                return(
                    <div onClick={() => chooseNft(item.name)}>{item.name}</div>
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