import { AppDispatch } from '@/store';
import { useDispatch } from 'react-redux';

export default () => useDispatch<AppDispatch>();
