import React, { useState, useEffect } from 'react';
import { Button, PopoutWrapper, ModalDismissButton, useAdaptivityConditionalRender, Input, Textarea} from '@vkontakte/vkui';


const CustomPopout = ({ onClose, addNewEvents }) => {
    const { sizeX } = useAdaptivityConditionalRender();
    const [event, setEvent] = useState({name: '', description: '', date: ''});

    const addNewEvent = (e) => {
        e.preventDefault();
        if ((!event.name) || (!event.description) || (!event.date))  {
            
        } else {
            addNewEvents(event);
            setEvent({name: '', description: '', date: ''});
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

            <form className='event-create__content'>
                <h2 className='event-create__heading'>Название события</h2>
                <Input 
                value={event.name} 
                required 
                className='event-create__input'
                onChange={e => setEvent({...event, name: e.target.value})}
                />

                <h2 className='event-create__heading'>Описание события</h2>
                <Textarea 
                value={event.description} 
                required className='event-create__input'
                onChange={e => setEvent({...event, description: e.target.value})}
                />

                <h2 className='event-create__heading'>Дата проведения</h2>
                <Input 
                value={event.date} 
                required 
                className='event-create__input'
                onChange={e => setEvent({...event, date: e.target.value})}
                />
                
                <Button size="l" appearance="accent" mode="secondary" style={{marginBottom: '10px'}} onClick={addNewEvent}>
                Добавить
                </Button>
            </form>
            

            {sizeX.regular && (
            <ModalDismissButton className={sizeX.regular.className} onClick={onClose} />
            )}
        </div>
        </PopoutWrapper>
    );
};

export default CustomPopout;