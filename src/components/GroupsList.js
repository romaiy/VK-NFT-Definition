import React, { useState, useEffect } from 'react';
import {  ModalCardBase, ButtonGroup, Button, Div, Avatar } from '@vkontakte/vkui';

const GroupsList = ({groups, retarg}) => {

    const buttonClick = (groupId, item) => {
        retarg(groupId, item);
    }

    return(
        <Div className='wrapper'>
            {
                groups && 
                <div className='groups-list'>
                <div className='group-list__heading'>Твои сообщества</div>
                <ul className='group-list__row'>
                {groups.items.map((item) => {
                    return(
                        <li key={item.name}>
                        <ModalCardBase
                        style={{ width: 320}}
                        icon={<Avatar borderradius="l" src={item.photo_200}  size={72} />}
                        header={item.name}
                        dismissLabel={undefined}
                        actions={
                            <ButtonGroup mode="horizontal" gap="s" stretched style={{ justifySelf: 'center', textAlign: 'center'}}>
                            <Button size="l" mode="secondary" stretched onClick={() => buttonClick(item.id, item)}>
                                Создать группу
                            </Button>
                            </ButtonGroup>
                        }
                        />
                        </li>
                    )
                })}
                
                </ul>
            </div>
            }
            
        </Div>
    )
};


export default GroupsList;