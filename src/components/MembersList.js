import React, { useState, useEffect } from 'react';
import UserData from './UserData';
import { Group, Search, Cell, Footer } from '@vkontakte/vkui';

const MembersList = ({members}) => {
    const [user, setUser] = useState([]);
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

    const [search, setSearch] = React.useState('');

    const onChange = (e) => {
        setSearch(e.target.value);
    };

    const userFiltered = user.filter(
        ({ first_name }) => first_name.toLowerCase().indexOf(search.toLowerCase()) > -1,
    );

    if (!user) return <div>В этом сообществе еще нет участников.</div>

    return(
        <div className='members'>
                <React.Fragment>
                    <Group>
                        <Search value={search} onChange={onChange} after={null} />
                        {userFiltered.length > 0 &&
                        userFiltered.map((item) => <UserData activeId={activeId} key={item.id} first_name={item.first_name} last_name={item.last_name} photo_200={item.photo_200} userId={item.id} setId={setId}/>)}
                        {userFiltered.length === 0 && <Footer>Ничего не найдено</Footer>}
                    </Group>
                </React.Fragment>
        </div>
    )
};


export default MembersList;