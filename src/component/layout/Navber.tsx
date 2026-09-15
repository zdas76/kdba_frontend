import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { Box, Divider } from '@mui/material';
import { AssessmentRounded, AttachMoneyOutlined, Dashboard, FeedRounded, FormatListBulleted, PeopleAltSharp, Settings, VerifiedUser } from '@mui/icons-material';
import { Link } from '@tanstack/react-router';

export default function Navber() {
    const id = React.useId();

    return (
        <Box>
            <Box className="flex justify-center gap-2 p-3 cursor-pointer  flex-col pl-4">
                <Typography sx={{ color: 'white', fontWeight: 'bold', textAlign: 'center', fontSize: '24px', margin: '10px' }} >এডমিন প্যানেল</Typography>

                <Divider sx={{ bgcolor: "white", height: .5 }} />

                <Typography sx={{ color: 'white', fontWeight: 'bold', textAlign: 'center', fontSize: '18px', margin: '5px' }}>Log In: { }</Typography>

                <Divider sx={{ bgcolor: "white", height: .5 }} />


            </Box>
            <Box className="flex items-center gap-2 hover:bg-slate-600 transition-colors rounded py-3 my-2 px-4">
                <Typography sx={{ color: 'white', fontWeight: 'light' }} >
                    <Dashboard sx={{ color: 'white' }} /> ড্যাশবোর্ড
                </Typography>
            </Box>
            <Box>
                <Accordion sx={{ bgcolor: "#354358", boxShadow: 0, border: "none", '&:hover': { bgcolor: "#505e78ff" } }}>
                    <AccordionSummary
                        expandIcon={<ArrowDropDownIcon sx={{ color: 'white' }} />}
                        aria-controls={`${id}-panel1-content`}
                        id={`${id}-panel1-header`}
                    >
                        <Typography component="span" sx={{ color: 'white', fontWeight: 'bold' }}><Settings /> সেটিংস</Typography>
                    </AccordionSummary>
                    <AccordionDetails className=''>
                        <Typography className='space-y-4'>
                            <Link className='flex items-center gap-2 w-full py-1 px-2 text-white hover:bg-slate-600 transition-colors rounded' to="/dashboard/settings/createUser"><VerifiedUser sx={{ color: 'white' }} /> ইউজার তৈরি</Link>
                            <Link to="/dashboard/settings/allAdvocates" className='flex items-center gap-2 w-full py-1 px-2 text-white hover:bg-slate-600 transition-colors rounded' ><PeopleAltSharp sx={{ color: 'white' }} /> এডভোকেট লিস্ট</Link>

                            <Link to="/dashboard/settings/formCategory" className='flex items-center gap-2 w-full py-1 px-2 text-white hover:bg-slate-600 transition-colors rounded'><FormatListBulleted sx={{ color: 'white' }} /> ফরম ক্যাটাগরি</Link>
                        </Typography>

                    </AccordionDetails>
                </Accordion>

                <Accordion sx={{ bgcolor: "#354358", boxShadow: 0, border: "none", '&:hover': { bgcolor: "#505e78ff" } }}>
                    <AccordionSummary
                        expandIcon={<ArrowDropDownIcon sx={{ color: 'white' }} />}
                        aria-controls={`${id}-panel2-content`}
                        id={`${id}-panel2-header`}
                    >
                        <Typography component="span" sx={{ color: 'white', fontWeight: 'bold' }}>< FeedRounded sx={{ color: 'white' }} /> ফরম</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography className='space-y-4'>
                            <Link to="/dashboard/formSales/formSales" className='flex items-center gap-2 w-full py-1 px-2 text-white hover:bg-slate-600 transition-colors rounded '><AttachMoneyOutlined sx={{ color: 'white' }} /> ফরম সেল</Link>
                            <Link to="/dashboard/formSales/formSalesReport" className='flex items-center gap-2 w-full py-1 px-2 text-white hover:bg-slate-600 transition-colors rounded '><AssessmentRounded sx={{ color: 'white' }} /> ফরম সেল রির্পোট</Link>
                        </Typography>
                    </AccordionDetails>
                </Accordion>

                <Accordion sx={{ bgcolor: "#354358", boxShadow: 0, border: "none", '&:hover': { bgcolor: "#505e78ff" } }}>
                    <AccordionSummary
                        expandIcon={<ArrowDropDownIcon sx={{ color: 'white' }} />}
                        aria-controls={`${id}-panel2-content`}
                        id={`${id}-panel2-header`}
                    >
                        <Typography component="span" sx={{ color: 'white', fontWeight: 'bold' }}>< FeedRounded sx={{ color: 'white' }} /> রির্পোট</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography className='space-y-4'>
                            <Link to="/dashboard/report/salesFormReportBycategory" className='flex items-center gap-2 w-full py-1 px-2 text-white hover:bg-slate-600 transition-colors rounded '><PeopleAltSharp sx={{ color: 'white' }} /> বিক্রিত ফরম</Link>
                            <Link to="/dashboard/report/salesFormReportByAdvocateId" className='flex items-center gap-2 w-full py-1 px-2 text-white hover:bg-slate-600 transition-colors rounded '><AssessmentRounded sx={{ color: 'white' }} /> আইডি ভিত্তিক বিক্রিত ফরম</Link>
                        </Typography>
                    </AccordionDetails>
                </Accordion>

                <Accordion sx={{ bgcolor: "#354358", boxShadow: 0, border: "none", '&:hover': { bgcolor: "#505e78ff" } }}>
                    <AccordionSummary
                        expandIcon={<ArrowDropDownIcon sx={{ color: 'white' }} />}
                        aria-controls={`${id}-panel2-content`}
                        id={`${id}-panel2-header`}
                    >
                        <Typography component="span" sx={{ color: 'white', fontWeight: 'bold' }}>< FeedRounded sx={{ color: 'white' }} /> রির্পোট এডভোকেট ভিত্তিক</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography className='space-y-4'>
                            <Link to="/dashboard/advocate/reportByDate" className='flex items-center gap-2 w-full py-1 px-2 text-white hover:bg-slate-600 transition-colors rounded '><PeopleAltSharp sx={{ color: 'white' }} /> তারিখ ভিত্তিক</Link>
                            <Link to="/dashboard/advocate/reportByForm" className='flex items-center gap-2 w-full py-1 px-2 text-white hover:bg-slate-600 transition-colors rounded '><AssessmentRounded sx={{ color: 'white' }} /> ফরম ভিত্তিক</Link>
                        </Typography>
                    </AccordionDetails>
                </Accordion>
            </Box>
        </Box>
    );
};
