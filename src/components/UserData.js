import React, { useState, useEffect } from 'react';

import { Avatar,  RichCell, ButtonGroup, Button, SplitLayout, View, SplitCol } from '@vkontakte/vkui';
import CustomModal from './CustomModal';

const UserData = ({ groupId, activeId, first_name, last_name, photo_200, userId, setId}) => {
    const [a, setA] = useState();
    const onClick = () => setModal(<CustomModal groupId={groupId} userId={userId} onClose={() => setModal(null)} />);
    const [modal, setModal] = useState(null);
    
    useEffect(() => {
		for (let i = 0; i < activeId.length; i++) {
            if (activeId[i] === userId) {
                setA(activeId[i]);
            }
        }
	});

    return(
        <SplitLayout modal={modal}>
            <SplitCol>
            <View activePanel="modal">
            <RichCell
            id="modal"
            modal={modal}
            before={<Avatar src={photo_200} size={48} />}
            style = {
                (userId === a) ? {display: "none"} : {}
            }
            actions={
                <ButtonGroup mode="horizontal" gap="s" stretched>
                    <Button  modal={modal} mode="primary" size="s" onClick={onClick}>
                    Вручить NFT награду
                    </Button>
                    <Button mode="secondary" size="s" onClick={() => setId(userId)}>
                    Скрыть
                    </Button>
                </ButtonGroup>
            }
            disabled
            >   
            {first_name} {last_name}
            </RichCell>
            </View>
            </SplitCol>
        </SplitLayout>
    )
};


export default UserData;