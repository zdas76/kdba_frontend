export type AdvocateStatus = 'ACTIVE' | 'INACTIVE' | 'DELETE' | 'SUSPENDED';

export interface AdvocateEduInfo {
    id?: number;
    examName: string;
    instituteName?: string;
    boardName: string;
    passingYear?: number;
    result: string;
}

export interface AdvProfile {
    id?: number;
    fatherName?: string;
    motherName?: string;
    spouseName?: string;
    dob?: string;
    gender?: string;
    presentAddress?: string;
    permanentAddress?: string;
    religion?: string;
    nationality?: string;
    nominiName?: string;
    nominiRelation?: string;
    advocateEduInfo?: AdvocateEduInfo[];
}

export interface Advocate {
    advocateId: number;
    name: string;
    contactNo: string;
    email?: string;
    password?: string;
    profileImage?: string;
    placeofBirth?: string;
    status?: AdvocateStatus | string;
    advProfile?: AdvProfile;
}

export interface CreateAdvocateInput {
    advocateId: number;
    name: string;
    contactNo: string;
    password?: string;
    email?: string;
    profileImage?: string;
    placeofBirth?: string;
    advProfile?: AdvProfile;
}