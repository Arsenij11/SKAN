import React from 'react';

class Header extends React.Component {
    render() {
        return (
            <header>
                <img
                    src='https://s3-alpha-sig.figma.com/img/01e7/240a/a21cf0e37634bf7f262554f86388e0d5?Expires=1741564800&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=UU0T2W2dDC16euVgXlidD8YUt7ReQGanRXgnaZstVlf7OjqqJRjQ8Bb3XSMowPlczIo99RGeXbtezL~~JWc8Q4g~Y0QQwjO8Mm-EK5UjOtCnLC6KqKf5Rolzj3T0-cwmGU~cx~I~JtgEvimyafjkCPFnejiJ2lSLu~iE4P20dmsnCeCUkCY8EiGy~WtffHIWDWZ27asVJExXC3vEHitCI7x3uZRhky-Meh9C~2FFAZyQn0W7jnUZ39tTlqUnw0-dpdSXcF9d5Hn4zXo0gEs-mB4mUL5DCVGGALuNOHIYKtehq1bI4rXi1X9gmZUVe7yNsYgDlIFcrgIMLr6OQHkjHA__'
                    className='logo'
                />
                <span className="info">
                    <p>Главная</p>
                    <p>Тарифы</p>
                    <p>FAQ</p>
                </span>
                <span className="register">
                    <p>Зарегистрироваться</p>
                    <p> | </p>
                    <button>Войти</button>
                </span>
            </header>
        )
    }
}

export default Header;