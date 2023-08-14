import { useContext } from "react";
import { _data } from "@/Context/Context";
import LogoutIcon from '@mui/icons-material/Logout';
import { styled } from '@mui/system';

export default function Disconnect({ setRadioList, currentUser }) {

    const context = useContext(_data);
    const Logout = styled(LogoutIcon)`
        color: #aaa;
        height: 1.25rem;
        width: 1.25rem;
    `;

    return (
        <>
        {
            currentUser ? (
                <button
                    className="rounded-full h-[2.5rem] w-[2.5rem] border-[2px] border-[#aaa]  flex justify-center items-center mt-[0.25rem] ml-[2rem]"
                    onClick={() => {
                        context.setCurrentUser(null);
                        setRadioList(true);
                    }}
                >
                    <Logout />
                </button>
            ):(
                <></>
            )
        }
        </>
    )
}
// if everthing is ai generated, then why ai can not generate me?
// if everthing is ai generated, then should why ai is own by someone?
