import React, { useEffect, useState} from 'react';
import bridge from '@vkontakte/vk-bridge';

import { Div, Button, Banner, View, SplitCol, SplitLayout } from '@vkontakte/vkui';
import EventList from '../components/EventList';
import CustomPopout from '../components/CustomPopout';
import Members from '../components/Members';

const SelectedGroup = ({ userId, token, groupId, groupData }) => {
    const [events, setEvents] = useState([]);

    const [popout, setPopout] = React.useState(null);
    const onClick = () => setPopout(<CustomPopout addNewEvents={addNewEvents} onClose={() => setPopout(null)} />);
    
    const addNewEvents = (event) => {
        bridge.send('VKWebAppCallAPIMethod', {
            method: 'groups.create',
                params: {
                type: 'event',
                title: event.name,
                v: '5.131',
                access_token: token,
                description: event.description,
                }})
                .then((data) => { 
                if (data.response) {
                    console.log(data.response);
                }
                })
                .catch((error) => {
                console.log(error);
                });
        setEvents([...events, event]);
    } 

    const color = [
        {
            color: 'linear-gradient(90deg, #885CE6 0%, #E43FFF 100%)',
            subheader1: 'Как я могу использовать',
            subheader2: 'этот сервис?',
            header: 'О приложении',
        },
        {
            color: 'linear-gradient(90deg, #E65C5C 0%, #FF3FA7 100%)',
            subheader1: 'Как подключить свое',
            subheader2: 'сообщество?',
            header: 'Регистрация группы',
        }
    ]

    return(
        <Div className='selected'>
            <div className='selected__row'>
            {color.map((item) => {
                return(
                    <div style={{ width: '324px',marginRight: '16px' }} className='banner' key={item.color}>
                    <Banner
                        mode="image"
                        size="m"
                        header={item.header}
                        subheader={
                        <span>
                            {item.subheader1}
                            <br /> {item.subheader2}
                        </span>
                        }
                        background={
                        <div
                            style={{
                            background: item.color,
                            }}
                        />
                        }
                        asideMode="dismiss"
                        actions={
                        <Button appearance="overlay" size="m">
                            Подробнее
                        </Button>
                        }
                    />
                    </div>
                )
            })}
            </div>
            <h2 className='selected__heading'>События</h2>
            

            <SplitLayout popout={popout}>
            <SplitCol>
                <View activePanel="popout">
                <Button id="popout" popout={popout} size="l" appearance="accent" mode="secondary" style={{marginBottom: '24px'}} onClick={onClick}>
                + Добавить
                </Button>
                </View>
            </SplitCol>
            </SplitLayout>
            
            {(events.length === 0) ? <div className='selected__heading small'>У вас пока нет активных событий.</div> : <EventList events={events}/>}
            <Members token={token} groupId={groupId}/>
        </Div>
    )
    
};




export default SelectedGroup;
