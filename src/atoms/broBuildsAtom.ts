import { Timestamp } from 'firebase/firestore';
import {atom} from 'recoil';

export interface BroBuild{
    uid: string,
    creatorId: string,
    createdAt?: Timestamp,
}