export type AdvocateStatus = 'ACTIVE' | 'INACTIVE' | 'DELETE' | 'SUSPENDED'

export interface AdvocateEduInfo {
  id?: number
  examName: string
  instituteName?: string
  boardName: string
  passingYear?: number
  result: string
}

export interface AdvProfile {
  id?: number
  fatherName?: string
  motherName?: string
  spouseName?: string
  dob?: string
  gender?: string
  presentAddress?: string
  permanentAddress?: string
  religion?: string
  nationality?: string
  nominiName?: string
  nominiRelation?: string
}

export interface AdvocateInfo {
  id?: number
  advocateId: number
  name: string
  contactNo: string
  email?: string
  password?: string
  profileImage?: string
  placeofBirth?: string
  status?: AdvocateStatus
}

export interface Advocate {
  advinfo: AdvocateInfo
  advProfile?: AdvProfile
  advocateEduInfo?: AdvocateEduInfo[]
}


