import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import bridge from '@vkontakte/vk-bridge';

import { Panel, Div, Tabs, HorizontalScroll, TabsItem, View } from '@vkontakte/vkui';
import Groups from './Groups';
import Market from './Market';
import AddNFT from './AddNFT';
import SelectedGroup from './SelectedGroup';
import Profile from './Profile';

const Home = ({ id, fetchedUser }) => {
	const [selected, setSelected] = React.useState('groups');
	const [disabled, setDisabled] = React.useState(false);
	const [userId, setId] = React.useState(null);
	const [current, setCurrent] = React.useState('grouppp');
	const [groupId, setGroupId] = React.useState(0);
	const [groupData, setGroupData] = React.useState(null);
	const [token, setToken] = React.useState(null);

	const tabs = [
		{
			'name': 'Сообщество',
			'path': 'groups',
			'disabled': false
		},
		{
			'name': 'Маркет',
			'path': 'market',
			'disabled': true
		},
		{
			'name': 'Добавление NFT',
			'path': 'addNFT',
			'disabled': false
		},
		{
			'name': 'Настройка сообщества',
			'path': 'settings',
			'disabled': true
		},
		{
			'name': 'Профиль',
			'path': 'profile',
			'disabled': false
		}
	];

	useEffect(() => {
		if (fetchedUser) {
			setId(fetchedUser.id)
		}
	});

	const getToken = (token) => {
		setToken(token);
	}

	const go = (groupId, item) => {
		setGroupData(item);
		setGroupId(groupId);
		setCurrent(`group${groupId}`);
		setSelected(`group${groupId}`);
	}
	
	return (
	<Panel id={id}>
		{fetchedUser && 
		<Div style={{display:"flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px"}}>
			<div>
				<div style={{fontSize: "15px", lineHeight: "18px", marginBottom: "4px"}}>
					Привет,
				</div>
				<div style={{fontWeight: "700", fontSize: "20px", lineHeight: "24px"}}>
					{fetchedUser.first_name}👋
				</div>
			</div>
		</Div>
		}
		<Tabs mode={'default'} style={{marginBottom: "32px"}}>
        <HorizontalScroll arrowSize="m">
			{tabs.map((item) => {
				return(
					<TabsItem
					key={item.path}
					selected={selected === item.path}
					disabled={item.disabled}
					onClick={() => setSelected(item.path)}
					style={{flexGrow: 0}}
					>
						{item.name}
					</TabsItem>
				)
			})}
        </HorizontalScroll>
		</Tabs>

		<View activePanel={selected}>
			<Groups id="groups" userId={userId} go={go} getToken={getToken}/>
			<Market id="market"/>
			<AddNFT id="addNFT"/>
			<Profile userId={userId} id="profile"/>
			<SelectedGroup userId={userId} token={token} id={current} groupId={groupId} groupData={groupData}/>
		</View>
	</Panel>
	)
};

Home.PropTypes = {
	id: PropTypes.string.isRequired,
	go: PropTypes.func.isRequired,
	fetchedUser: PropTypes.shape({
		photo_200: PropTypes.string,
		first_name: PropTypes.string,
		last_name: PropTypes.string,
		city: PropTypes.shape({
			title: PropTypes.string,
		}),
	}),
};

export default Home;
