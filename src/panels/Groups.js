import React, { useState, useEffect } from 'react';
import bridge from '@vkontakte/vk-bridge';
import fetchJsonp from 'fetch-jsonp';

import PropTypes from 'prop-types';
import '../style/style.css';
import banner from '../img/banner.png';

import { Panel, Div, Tabs, HorizontalScroll, TabsItem, View } from '@vkontakte/vkui';
import GroupsList from '../components/GroupsList';

const Groups = ({userId, go, getToken}) => {
    const [groups, setGroups] = useState(null);

    const retarg = (id, item) => {
        go(id, item);
    }

    useEffect(() => {
        async function fetchData() {
            await bridge.send('VKWebAppGetAuthToken', {
                app_id: 51557766,
                scope: 'groups',
            })
                .then((data) => { 
                    console.log(data)
                    if (data.access_token) {
                        console.log(data.access_token);
                        getToken(data.access_token);
                            bridge.send('VKWebAppCallAPIMethod', {
                            method: 'groups.get',
                                params: {
                                user_ids: userId,
                                filter: 'admin',
                                extended: 1,
                                v: '5.131',
                                access_token: data.access_token
                                }})
                                .then((data) => { 
                                if (data.response) {
                                    setGroups(data.response);
                                }
                                })
                                .catch((error) => {
                                console.log(error);
                                });
                    }
                })
                .catch((error) => {
                    console.log(error);
                });
        }
        fetchData()
    }, []);

    return(
        <div className='wrapper'>
            <div className='groups'>
                <div className='groups__column'>
                    <div className='groups__heading'>
                    VK NFTicker
                    </div>
                    <div className='groups__text'>
                    Ваш помощник в веселой мотивации
                    </div>
                </div>
                <div className='groups__bg'>
                <img src={banner}/>
                </div>
            </div>
            <GroupsList groups={groups} retarg={retarg}/>
        </div>
    )
};

Groups.PropTypes = {
    userId: PropTypes.string.isRequired
};

export default Groups;