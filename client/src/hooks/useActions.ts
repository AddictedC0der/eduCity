import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { ActionCreators } from "../store/features/action_creators";


export const useActions = () => {
    const dispatch = useDispatch()
    return bindActionCreators(ActionCreators, dispatch)
}