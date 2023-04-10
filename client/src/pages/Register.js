export default function Register() {
    return (
        <div className='App'>
            <h1>Register</h1>

            <form>
                <div>
                    <label htmlFor='first-name'>First Name: </label>
                    <input id='first-name' type='text' />
                </div>
                <div>
                    <label htmlFor='last-name'>Last Name: </label>
                    <input id='last-name' type='text' />
                </div>
                <div>
                    <label htmlFor='birthday'>Birthday: </label>
                    <input id='birthday' type='text' />
                </div>
                <div>
                    <label htmlFor='email'>Email: </label>
                    <input id='email' type='email' />
                </div>
                <div>
                    <label htmlFor='occupation'>Occupation: </label>
                    <input id='occupation' type='text' />
                </div>
                <div>
                    <label htmlFor='password'>Password: </label>
                    <input id='password' type='text' />
                </div>

                <button>Sign Up!</button>
                
            </form>
        </div>
    )
}
