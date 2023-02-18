import React from 'react';
import '../style/style.css';


import { ModalCardBase, Div, Avatar, ButtonGroup, Button } from '@vkontakte/vkui';

const EventList = ({events}) => {
    
    return(
        <div>
            <div className='events-list'>
                <ul className='events-list__row'>
                {(events.map((item) => {
                    return(
                        <li className='events-list__block' key={item.name}>
                        <ModalCardBase
                        style={{ width: 320}}
                        icon={<Avatar borderradius="l" src={item.photo_200}  size={72} />}
                        header={item.name}
                        dismissLabel={undefined}
                        actions={
                            <ButtonGroup mode="horizontal" gap="s" stretched style={{ justifySelf: 'center', textAlign: 'center'}}>
                            <Button size="l" mode="secondary" stretched >
                                Подробнее
                            </Button>
                            </ButtonGroup>
                        }
                        />
                        </li>
                    )
                })
                )}
                </ul>
            </div>
        </div>
    )
};


export default EventList;