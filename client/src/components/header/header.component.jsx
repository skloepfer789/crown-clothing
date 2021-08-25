import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import { createStructuredSelector } from 'reselect';

import {ReactComponent as Logo} from '../../assets/crown.svg';
import CartIcon from '../cart-icon/cart-icon.component';
import CartDropdown from '../cart-dropdown/cart-dropdown.component';
import { selectCartHidden } from '../../redux/cart/cart.selectors';
import { selectCurrentUser } from '../../redux/user/user.selector';
import { signOutStart } from '../../redux/user/user.actions';

import './header.styles.scss';

const Header = ({currentUser, hidden, signOutStart}) => (
    <header className='header'>
        <Link to='/' className='logo-container'>
            <Logo className='logo'></Logo>
        </Link>
        <div className='options'>
            <Link className='option' to='/shop'>SHOP</Link>
            <Link className='option' to='/contact'>CONTACT</Link>
            {
                currentUser ? (
                    <div className='option' onClick={signOutStart}> SIGN OUT </div>
                ) : (
                    <Link className='option' to='/signin'>SIGN IN</Link>
                )
            }
            <CartIcon/>
        </div>
        {
            hidden ? null : <CartDropdown />
        }
    </header>
);

const mapDispatchToProps = dispatch => ({
    signOutStart: () => dispatch(signOutStart())
});

const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser,
    hidden: selectCartHidden
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);