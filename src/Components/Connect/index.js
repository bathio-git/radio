import LoginOutlinedIcon from '@mui/icons-material/LoginOutlined';

export default function Connect({hide}) {

    return (
        <>
            <span 
                key="signIn"
                className="flex items-center"
            >
                <LoginOutlinedIcon fontSize="small"/>
                &nbsp;
                <p className="text-[#000] lg:text-[#aaa] w-0 lg:w-max ">sign in</p>
                
            </span>
        </>
    )
}