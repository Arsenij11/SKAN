import React from 'react';
import loading from '../icons/52462ec6ba8380b43ebf17cb77c2880d.png';
import avatar from '../img/Аватарка по умолчанию.jpg';
import axios from "axios";

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
                    src='https://s3-alpha-sig.figma.com/img/01e7/240a/a21cf0e37634bf7f262554f86388e0d5?Expires=1741564800&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=UU0T2W2dDC16euVgXlidD8YUt7ReQGanRXgnaZstVlf7OjqqJRjQ8Bb3XSMowPlczIo99RGeXbtezL~~JWc8Q4g~Y0QQwjO8Mm-EK5UjOtCnLC6KqKf5Rolzj3T0-cwmGU~cx~I~JtgEvimyafjkCPFnejiJ2lSLu~iE4P20dmsnCeCUkCY8EiGy~WtffHIWDWZ27asVJExXC3vEHitCI7x3uZRhky-Meh9C~2FFAZyQn0W7jnUZ39tTlqUnw0-dpdSXcF9d5Hn4zXo0gEs-mB4mUL5DCVGGALuNOHIYKtehq1bI4rXi1X9gmZUVe7yNsYgDlIFcrgIMLr6OQHkjHA__'
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