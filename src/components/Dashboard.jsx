import React, { useState, useEffect } from 'react';
import {
  Box,
  AppBar,
  Toolbar,
  Typography,
  Button,
  Card,
  CardContent,
  Grid,
  Container,
  Paper,
  IconButton,
  useMediaQuery,
} from '@mui/material';
import { motion } from 'framer-motion';
import { FaReact} from "react-icons/fa";
import LogoutIcon from '@mui/icons-material/Logout';
import {  SiGraphql, SiPhp, SiMysql } from 'react-icons/si';
import { SunIcon } from '@heroicons/react/24/outline';
import { useQuery } from '@apollo/client';
import toast from "react-hot-toast";
import { useNavigate } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import { GET_AUTH_USER } from "../graphql/queries/user.query";
import { useAuth } from '../context/AuthContext';
import ReactPlayer from 'react-player/lazy';

const Dashboard = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [stepCompletion, setStepCompletion] = useState([false, false, false, false]); // Track completion
  const Navigate = useNavigate();
  const { logout, loading: authLoading } = useAuth();
  const theme = useTheme();
  const { data: authUserData } = useQuery(GET_AUTH_USER);
  
  const roadmapSteps = [
    {
      icon: <FaReact />,
      label: 'React.js',
      color: '#61DAFB',
      description: 'Learn the fundamentals of React.js, a JavaScript library for building user interfaces.',
      link: 'https://reactjs.org/',
      resources: [
        { name: "React Docs", url: "https://reactjs.org/docs/getting-started.html" },
        { name: "Scrimba React Course", url: "https://scrimba.com/learn/learnreact" }
      ]
    },
    {
      icon: <SiGraphql />,
      label: 'GraphQL',
      color: '#E535AB',
      description: 'Discover GraphQL, a query language for your API and a server-side runtime for executing queries.',
      link: 'https://graphql.org/',
      resources: [
        { name: "GraphQL Docs", url: "https://graphql.org/learn/" },
        { name: "How to GraphQL", url: "https://www.howtographql.com/" }
      ]
    },
    {
      icon: <SiPhp />,
      label: 'PHP',
      color: '#777BB4',
      description: 'Explore PHP, a popular general-purpose scripting language that is especially suited to web development.',
      link: 'https://www.php.net/',
      resources: [
        { name: "PHP Docs", url: "https://www.php.net/docs.php" },
        { name: "PHP The Right Way", url: "https://phptherightway.com/" }
      ]
    },
    {
      icon: <SiMysql />,
      label: 'MySQL',
      color: '#4479A1',
      description: 'Dive into MySQL, a widely used open-source relational database management system (RDBMS).',
      link: 'https://www.mysql.com/',
      resources: [
        { name: "MySQL Docs", url: "https://dev.mysql.com/doc/" },
        { name: "MySQL Tutorial", url: "https://www.mysqltutorial.org/" }
      ]
    },
  ];

  const videoCards = [
    {
      title: 'React Basics',
      url: 'https://www.veed.io/view/61c16226-fadc-4c33-8fb3-dcaaff17b67b?panel=share',
      link: 'https://www.veed.io/view/61c16226-fadc-4c33-8fb3-dcaaff17b67b?panel=share',
    },
    {
      title: 'GraphQL Intro',
      url: 'https://www.veed.io/view/993f2eb8-0cd6-4af7-a027-ff86ce899706?panel=share',
      link: 'https://www.veed.io/view/993f2eb8-0cd6-4af7-a027-ff86ce899706?panel=share',
    },
    {
      title: 'PHP Fundamentals',
      url: 'https://www.veed.io/view/8e8edff2-b854-42b8-9ca8-c2e99d91438c?panel=share',
      link: 'https://www.veed.io/view/8e8edff2-b854-42b8-9ca8-c2e99d91438c?panel=share',
    },
    {
      title: 'MySQL Mastery',
      url: 'https://www.veed.io/view/b2f0cf8a-dba5-478c-95cc-d357043a6a82?panel=share',
      link: 'https://www.veed.io/view/b2f0cf8a-dba5-478c-95cc-d357043a6a82?panel=share',
    },
  ];

  useEffect(() => {
    // Simulate auto-progression. Remove this if you want manual advancement only
    const timer = setInterval(() => {
      setActiveStep((prev) => (prev < 3 ? prev + 1 : 0));
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  // Load initial completion state from localStorage (or similar) on mount
  useEffect(() => {
    const savedCompletion = localStorage.getItem('stepCompletion');
    if (savedCompletion) {
      setStepCompletion(JSON.parse(savedCompletion));
    }
  }, []);

  const handleLogout = async () => {
    try {
      const result = await logout();
      if (result.success) {
        toast.success("Logged out successfully!");
        Navigate('/');
      } else {
        toast.error(result.error || "Failed to logout. Please try again.");
      }
    } catch (error) {
      console.error("Logout error:", error);
      toast.error("Failed to logout. Please try again.");
    }
  };

  const handleStepComplete = (index) => {
    const newCompletion = [...stepCompletion];
    newCompletion[index] = true;
    setStepCompletion(newCompletion);

    // Persist the new completion state (e.g., localStorage or API)
    localStorage.setItem('stepCompletion', JSON.stringify(newCompletion));
  };
  
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const isStepCompleted = (index) => stepCompletion[index];
  
  const buttonSx = {
    mr: 1,  // Reduced margin to accommodate two buttons
    background: 'linear-gradient(45deg, #0ea5e9, #1d4ed8)',
    color: 'white', // Make Text White
    fontWeight: 'bold', // Bold font
    padding: '8px 16px',
    borderRadius: '8px',
    boxShadow: '0px 3px 5px rgba(0, 0, 0, 0.2)', // Add a shadow
    transition: 'transform 0.2s, box-shadow 0.2s',
    '&:hover': {
      transform: 'translateY(-2px)',  // Slight lift on hover
      boxShadow: '0px 5px 7px rgba(0, 0, 0, 0.3)', // Increased shadow
      backgroundColor: '#0c85ca', // A slight darken on hover for better contrast
    },
    [theme.breakpoints.down('sm')]: {
      padding: '6px 12px',
      fontSize: '0.75rem',
      width: 'fit-content',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      mr: 0,
      mb: 1, // Add margin to the button in small screen mode to spread them a little vertically
    },
  };

  return (
    <Box sx={{ minHeight: '100vh', background: 'linear-gradient(to bottom, #e0f2fe, #f0f9ff)', position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
      {/* Floating Elements */}
      <Box sx={{ position: 'absolute', top: 100, left: -50, width: 200, height: 200, background: 'rgba(255,255,255,0.3)', borderRadius: '50%', filter: 'blur(40px)', animation: 'float 20s infinite' }} />

      <AppBar position="static" sx={{
        background: 'rgba(255,255,255,0.8)', backdropFilter: 'blur(10px)', boxShadow: 'none',
        zIndex: 10 // Ensure AppBar stays on top
      }}>
        <Toolbar sx={{
          display: 'flex',
          justifyContent: 'space-between', // This pushes items to the edges
          alignItems: 'center', // Vertically centers items
          flexWrap: 'nowrap',     // Prevent wrapping
        }}>
          {/* Left Side: Logo and Scandiweb Ready */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <motion.div whileHover={{ rotate: 20 }}>
              <SunIcon className="cursor-pointer w-8 h-8 text-sky-700" />
            </motion.div>
            {!isSmallScreen && (
              <Typography variant="h6" sx={{cursor: 'pointer', fontWeight: 700, background: 'linear-gradient(45deg, #0ea5e9, #1d4ed8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                Scandiweb Ready
              </Typography>
            )}
          </Box>

          {/* Middle: Buttons (Conditionally Rendered) */}
          <Box sx={{ display: { xs: 'none', sm: 'flex' }, gap: 1, order: 2, flexGrow: 1, justifyContent: 'center' }} >
            <Button variant="contained" sx={buttonSx} onClick={() => Navigate('/timezone')} >
              Check Eligibility
            </Button>
            <Button variant="contained" sx={buttonSx} onClick={() => Navigate('/todos')} >
              Graphql + MERN Todo App
            </Button>
            
            <Typography variant="h6" sx={{ fontWeight: 700, background: 'linear-gradient(45deg, #0ea5e9, #1d4ed8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', order: 1, marginLeft: 10 }}>
              Welcome {authUserData?.authUser?.username}!
            </Typography>
          </Box>

          {/* Right Side: Logout Icon */}
          <Box sx={{ order: 3 }}>
            <IconButton onClick={handleLogout} sx={{
              background: 'rgba(14,165,233,0.1)', '&:hover': { background: 'rgba(14,165,233,0.2)' }
            }} disabled={authLoading}>
              <LogoutIcon style={{ width: 24, height: 24, color: '#0ea5e9' }} />
            </IconButton>
          </Box>

          {/* Mobile Mode */}
          <Box sx={{ display: { xs: 'flex', sm: 'none' }, gap: 1, order: 2, flexGrow: 1, justifyContent: 'center' }} >
            <Button variant="contained" sx={buttonSx} onClick={() => Navigate('/timezone')} >
              Check Eligibility
            </Button>
            <Button variant="contained" sx={buttonSx} onClick={() => Navigate('/todos')} >
              Graphql + MERN Todo App
            </Button>
          </Box>
        </Toolbar>
      </AppBar>

      <Container maxWidth="xl" sx={{ py: 4 }}>
        <Grid container spacing={4}>
          {/* Video Cards */}
          {videoCards.map((card, index) => (
            <Grid item xs={12} md={6} lg={3} key={index}>
              <motion.div whileHover={{ scale: 1.05 }}>
                <Card sx={{
                  borderRadius: 4,
                  boxShadow: '0 8px 32px rgba(14,165,233,0.1)',
                  overflow: 'hidden',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column'
                }}>
                  <Box sx={{ position: 'relative', paddingTop: '56.25%', width: '100%' }}>
                    <ReactPlayer
                      url={card.url}
                      width="100%"
                      height="100%"
                      style={{ position: 'absolute', top: 0, left: 0 }}
                      controls={true}
                      light={true}
                    />
                  </Box>
                  <CardContent sx={{ background: 'rgba(255,255,255,0.6)', flexGrow: 1 }}>
                    <Typography variant="h6" sx={{ fontWeight: 600, color: 'black' }}>
                      {card.title}
                    </Typography>
                    <Button 
                      variant="outlined" 
                      color="primary" 
                      sx={{ mt: 1 }}
                      onClick={() => window.open(card.link, '_blank')}
                    >
                      Open in New Tab
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>
          ))}

          {/* Animated Roadmap */}
          <Grid item xs={12}>
            <Paper sx={{
              p: 4,
              borderRadius: 4,
              background: 'rgba(255,255,255,0.8)',
              backdropFilter: 'blur(10px)'
            }}>
              <Typography variant="h5" sx={{
                mb: 4,
                fontWeight: 700,
                background: 'linear-gradient(45deg, #0ea5e9, #1d4ed8)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}>
                Learning Pathway
              </Typography>

              <Box sx={{
                display: 'flex',
                justifyContent: 'space-between',
                position: 'relative',
                height: 150 // Increased height to accommodate descriptions
              }}>
                {roadmapSteps.map((step, index) => (
                  <motion.div
                    key={step.label}
                    animate={{
                      scale: activeStep === index ? 1.2 : 1,
                      color: activeStep === index ? step.color : '#94a3b8'
                    }}
                    transition={{ duration: 0.3 }}
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      zIndex: 2,
                      cursor: 'pointer' // Make each step clickable
                    }}
                    onClick={() => window.open(step.link, '_blank')}  // Open link on click
                  >
                    <Box sx={{
                      width: 60,
                      height: 60,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      background: 'white',
                      borderRadius: '50%',
                      boxShadow: '0 4px 20px rgba(14,165,233,0.1)',
                      opacity: isStepCompleted(index) ? 0.5 : 1 //Dim completed steps
                    }}>
                      {React.cloneElement(step.icon, {
                        style: {
                          fontSize: 32,
                          color: activeStep === index ? step.color : '#94a3b8',
                          opacity: isStepCompleted(index) ? 0.5 : 1 //Dim completed steps
                        }
                      })}
                    </Box>
                    <Typography sx={{
                      mt: 1,
                      fontWeight: 600,
                      color: activeStep === index ? step.color : '#64748b',
                      opacity: isStepCompleted(index) ? 0.5 : 1 //Dim completed steps
                    }}>
                      {step.label}
                    </Typography>

                    {/* Complete Button (show only if NOT completed)*/}
                    {!isStepCompleted(index) && (
                      <Button
                        variant="contained"
                        size="small"
                        color="primary"
                        onClick={(e) => {
                          e.stopPropagation(); // Prevent link click
                          handleStepComplete(index);
                        }}
                      >
                        Complete
                      </Button>
                    )}
                  </motion.div>
                ))}

                {/* Progress Line */}
                <Box sx={{
                  position: 'absolute',
                  top: '30%',
                  left: '10%',
                  right: '10%',
                  height: 4,
                  background: '#e2e8f0',
                  '&:after': {
                    content: '""',
                    position: 'absolute',
                    left: 0,
                    width: `${(activeStep / 3) * 100}%`,
                    height: '100%',
                    background: '#0ea5e9',
                    transition: 'width 0.5s ease'
                  }
                }} />
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Dashboard;
