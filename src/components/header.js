import React from 'react';
import loading from '../icons/52462ec6ba8380b43ebf17cb77c2880d.png';
import avatar from '../img/Аватарка по умолчанию.jpg';
import axios from "axios";
import logo from '../icons/a21cf0e37634bf7f262554f86388e0d5.png';


class Header extends React.Component {
    token = null;
    constructor(props) {
        super(props);
        this.state = {
            usedCompanyCount : null,
            companyLimit : null,
            error : null,
        }
    }
    componentDidMount() {
        let errors = false;
        if (this.token)  {
            axios({
                method: 'get',
                url: 'https://gateway.scan-interfax.ru/api/v1/account/info',
                headers:{
                    'Authorization': 'Bearer ' + this.token,
                }
            }).
            catch((error) => {
                errors = true;
                console.log(error);
                this.setState({
                    error : error?.code || 'Ошибка'
                })
            }).
            then((response) => {
                if (!errors) {
                    const data = response.data.eventFiltersInfo;
                    this.setState({
                        usedCompanyCount: data.usedCompanyCount,
                        companyLimit: data.companyLimit
                    })
                }
            })
        }
    }
    render() {
        const cookie = document.cookie;
        const {usedCompanyCount, companyLimit, error} = this.state;
        console.log(cookie);
        const token = cookie.match(/(token_for_skan_data)=(.+)/);
        this.token = token ? token[2] : null;
        return (
            <header>
                <img
                    src= {logo}
                    className='logo'
                />
                <span className="info">
                    <p onClick={event => window.location.href = 'http://localhost:5000'}>Главная</p>
                    <p>Тарифы</p>
                    <p>FAQ</p>
                </span>

                {!this.token ?
                    <span className="register_p">
                     <p>Зарегистрироваться</p>
                        <p> | </p>
                        <button onClick={event => window.location.href = 'http://localhost:5000/auth'}>Войти</button>

                    </span> :
                    <span className="register">
                        <span className="login_info">
                             {error ? <p>Произошла ошибка {error}</p> :
                                 usedCompanyCount === null && companyLimit === null ?
                                 <img src={loading}/> :
                                  <p>
                                      Использовано компаний <span>{usedCompanyCount}</span>
                                      <br/>
                                      Лимит по компаниям <span>{companyLimit}</span>
                                  </p>
                             }
                        </span>
                        <span className="profile_info">
                            <span>sf_student</span>
                            <img src={avatar} />
                            <span onClick={(event) => {
                                const setCookie = (name, value, options = {}) => {

                                    options = {
                                        path: '/',
                                        // при необходимости добавьте другие значения по умолчанию
                                        ...options
                                    };

                                    if (options.expires instanceof Date) {
                                        options.expires = options.expires.toUTCString();
                                    }

                                    let updatedCookie = encodeURIComponent(name) + "=" + encodeURIComponent(value);

                                    for (let optionKey in options) {
                                        updatedCookie += "; " + optionKey;
                                        let optionValue = options[optionKey];
                                        if (optionValue !== true) {
                                            updatedCookie += "=" + optionValue;
                                        }
                                    }

                                    document.cookie = updatedCookie;
                                }
                                setCookie('token_for_skan_data', "", {
                                    'max-age': -1
                                })
                                window.location.reload();
                            }}>Выйти</span>
                        </span>
                    </span>
                }
            </header>
        )
    }
}

export default Header;