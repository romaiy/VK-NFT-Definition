import React, { useState, useEffect } from 'react';

import { Avatar,  RichCell, ButtonGroup, Button } from '@vkontakte/vkui';

const UserData = ({ activeId, first_name, last_name, photo_200, userId, setId}) => {
    const [a, setA] = useState();
    
    useEffect(() => {
		for (let i = 0; i < activeId.length; i++) {
            if (activeId[i] === userId) {
                setA(activeId[i]);
            }
        }
	});

    return(
        <RichCell
            before={<Avatar src={photo_200} size={72} />}
            style = {
                (userId === a) ? {display: "none"} : {}
            }
            actions={
            <ButtonGroup mode="horizontal" gap="s" stretched>
                <Button mode="primary" size="s">
                Вручить NFT награду
                </Button>
                <Button mode="secondary" size="s" onClick={() => setId(userId)}>
                Удалить
                </Button>
            </ButtonGroup>
            }
            disabled
            >   
            {first_name} {last_name}
        </RichCell>
    )
};


export default UserData;