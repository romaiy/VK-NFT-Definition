import React, { useState } from 'react';
import axios from 'axios';
import { Button , Div } from '@vkontakte/vkui';

const AddNFT = () => {
    const [selectedImage, setSelectedImage] = useState(null);

    const fileUpload = () => {
        if (selectedImage != null) {
            const formData = new FormData();
            formData.append(
                'kostyaKot',
                selectedImage,
                selectedImage.name
            );
            axios.post('http://localhost:8000/api/table', formData, {
                    headers: {
                        'Content-Type': `'multipart/form-data'; application/vnd.openxmlformats-officedocument.spreadsheetml.sheet; boundary=${formData._boundary}`
                    }
                }).then((responseFromServer) => {
                    console.log(responseFromServer)
                }).catch((err) => {
                    console.log(err);
                });
        }
    }
    
    return (
        <Div>
        <h1 className='add__heading'>
            NFT стикеры
        </h1>

        <label className="add__input-file">
            <input type="file" name="myImage"
                onChange={(event) => {
                console.log(event.target.files && event.target.files[0]);
                setSelectedImage(event.target.files[0]);
                }}/>		
            <span>Выберите файл</span>
        </label>

        {selectedImage && (
            <div className='add__row'>
            <img className='add__image' alt="not fount" width={"250px"} src={URL.createObjectURL(selectedImage)} />
            <div className='add__btn-row'>
                <Button size="l" appearance="accent" mode="primary" style={{marginBottom: '24px', marginRight: '16px'}}  onClick={() => fileUpload()}>
                    Загрузить
                </Button>
                <Button size="l" appearance="accent" mode="secondary" style={{marginBottom: '24px'}} onClick={()=>setSelectedImage(null)}>
                    Удалить
                </Button>
                
            </div>
            </div>
        )}
        </Div>
    );
};


export default AddNFT;