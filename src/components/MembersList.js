import React, { useState, useEffect } from 'react';
import UserData from './UserData';

const MembersList = ({members}) => {
    const [user, setUser] = useState('');
    const [activeId, setActiveId] = useState([]);
    
    useEffect(() => {
		if (members) {
			setUser(members);
		}
	});

    const setId = (id) => {
        console.log(id);
        setActiveId([...activeId, id]);
    }

    if (!user) return <div>В этом сообществе еще нет участников.</div>

    return(
        <div className='members'>
            <ul className='members__list'>
                {user.map((item) => {
                    return(
                        <UserData activeId={activeId} key={item.last_name} first_name={item.first_name} last_name={item.last_name} photo_200={item.photo_200} userId={item.id} setId={setId}/>
                    )
                })}
            </ul>
        </div>
    )
};


export default MembersList;