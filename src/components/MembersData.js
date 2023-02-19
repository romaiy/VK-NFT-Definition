import React, { useState, useEffect } from 'react';
import bridge from '@vkontakte/vk-bridge';
import MembersList from './MembersList';

const MembersData = ({token, memberId, groupId}) => {
    const [members, setMembers] = useState([]);
    useEffect(() => {
        if (memberId) {
            const stringFromArr = memberId
            .join(', ');
            bridge.send('VKWebAppCallAPIMethod', {
                method: 'users.get',
                    params: {
                        user_ids: stringFromArr,
                        v: '5.131',
                        fields: 'photo_200',
                        access_token: token
                    }})
                    .then((data) => { 
                    if (data.response) {
                        setMembers(data.response);
                    }
                    })
                    .catch((error) => {
                    console.log(error);
            });
        }
	}, [memberId]);
    
    return(
        <div className='members'>
            <MembersList groupId={groupId} members={members}/>
        </div>
    )
};


export default MembersData;