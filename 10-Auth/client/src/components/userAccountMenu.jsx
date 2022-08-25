import React, { useContext } from 'react';
import { Button, Dropdown, Menu, Space, Avatar } from 'antd';
import AuthContext from '../Auth';


export default function AccountMenu() {
    const {user} = useContext(AuthContext)

    console.log(user)

    return  <Dropdown 
        overlay={<Menu
                items={[
                {
                    key: '1',
                    label: user.name,
                },
                {
                    key: '2',
                    label: (
                        <Button type='link'>
                            Logout
                        </Button>
                    ),
                    onClick: () => {
                        localStorage.removeItem("token")
                        window.location.reload();
                    }
                },
                ]}
            />}
        >
        <a onClick={e => e.preventDefault()}>
            <Space>
                <Avatar src={user.image} />
            </Space>
        </a>
    </Dropdown>
  
}