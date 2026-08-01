function InputError({ error }) {
    return (
        <div
            style={{
                display: 'flex',
                justifyContent: 'center',
                textAlign: 'center',
                width: '90%',
            }}
        >
            {' '}
            <span
                style={{
                    color: 'red',
                    fontSize: '0.8rem',
                }}
            >
                {error}
            </span>{' '}
        </div>
    );
}

export default InputError;
