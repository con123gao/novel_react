import React from 'react'
import PropTypes from 'prop-types'
import { NavBar } from 'antd-mobile'


/**
 * 对 antd中的导航栏的二次封装
 * @returns 
 */
NavBarAgain.defaultProps = {
    title: '个人中心'

};
NavBarAgain.PropTypes = {
    title: PropTypes.string
};
export default function NavBarAgain(props) {
    let { title } = props
    const handleBack = () => {
        //TODO 
    };
    return <NavBar>{title}</NavBar>
}
