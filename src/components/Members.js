import React, { useState, useEffect } from 'react';
import bridge from '@vkontakte/vk-bridge';

import MembersData from './MembersData';

const Members = ({token, groupId}) => {
    const [memberId, setMembersId] = useState([])

    useEffect(() => {
        if (groupId) {
            bridge.send('VKWebAppCallAPIMethod', {
                method: 'groups.getMembers',
                    params: {
                        group_id: groupId,
                        sort: 'id_asc',
                        v: '5.131',
                        access_token: token
                    }})
                    .then((data) => { 
                    if (data.response) {
                        setMembersId(data.response.items);
                    }
                    })
                    .catch((error) => {
                    console.log(error);
            });
        }
	}, [groupId]);

    return(
        <div className='members'>
            <h2 className='members__heading'>
            Участники
            </h2>
            <MembersData token={token} memberId={memberId}/>
        </div>
    )
};


export default Members;