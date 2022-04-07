import { useDispatch } from 'react-redux';
import { AppDispatch } from '../store';

export default () => useDispatch<AppDispatch>();
