import * as React from 'react';
import { Box, Container, Typography, TextField, Button, Paper, Grid, CssBaseline, ToggleButtonGroup, ToggleButton, Link, Slide, useTheme } from '@mui/material';
import { IUserDto } from '../../models/user.model';
import { useActions } from '../../hooks/useActions';
import { useNavigate, useLocation } from 'react-router-dom'

import Particles from 'react-tsparticles';
import { loadFull } from 'tsparticles';
import { LogIn } from './LogIn';


type Role = {name: string, label: string}


export default function SignUp() {
    const [slide, setSlide] = React.useState<boolean>(false);

    const theme = useTheme();

    const handleInitParticles = async (main: any) => {
        await loadFull(main);
    }

    const roles: Role[] = [
        {name: 'Student', label: 'Ученик' },
        {name: 'Teacher', label: 'Учитель'},
        {name: 'Parent', label: 'Родитель'}
    ]

    const [role, setRole] = React.useState<Role>(roles[0]);
    const { register } = useActions();
    const navigate = useNavigate()

    React.useEffect(() => {
        document.title = 'Регистрация | EduCity';
    }, [])

    const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget)
        const dto: IUserDto = {
            UserLogin: data.get('login') as string,
            UserPassword: data.get('password') as string,
            UserEmail: data.get('email') as string,
            Role: role.name
        }
        console.log(dto);
        register(dto);
    }

    const handleChangeRole = (event: React.MouseEvent<HTMLElement>, newRole: Role | null) => {
        console.log(newRole)
        if (newRole) {
            setRole(newRole);
        }
    }
    // 
    return (    
        <Box sx={{maxHeight: '100vh', width: '100%'}}>
            <Container component='main' sx={{maxWidth: '100%', display: 'flex', justifyContent: 'center'}} aria-label='SignUpContainer'>
                <CssBaseline />
                <div>
                    <Particles init={handleInitParticles} id="tsparticles"
                            options={{
                                "fullScreen": {
                                    "enable": true,
                                    "zIndex": -1
                                },
                                "particles": {
                                    "number": {
                                        "value": 10,
                                        "density": {
                                            "enable": false,
                                            "value_area": 800
                                        }
                                    },
                                    "color": {
                                        "value": "#fff"
                                    },
                                    // "shape": {
                                    //     "type": "star",
                                    //     "options": {
                                    //         // @ts-ignore
                                    //         "sides": 5
                                    //     }
                                    // },
                                    "opacity": {
                                        "value": 0.8,
                                        "random": false,
                                        "anim": {
                                            "enable": false,
                                            "speed": 1,
                                            "opacity_min": 0.1,
                                            "sync": false
                                        }
                                    },
                                    "size": {
                                        "value": 4,
                                        "random": false,
                                        "anim": {
                                            "enable": false,
                                            "speed": 40,
                                            "size_min": 0.1,
                                            "sync": false
                                        }
                                    },
                                    "rotate": {
                                        "value": 0,
                                        "random": true,
                                        "direction": "clockwise",
                                        "animation": {
                                            "enable": true,
                                            "speed": 5,
                                            "sync": false
                                        }
                                    },
                                    "line_linked": {
                                        "enable": true,
                                        "distance": 600,
                                        "color": "#ffffff",
                                        "opacity": 0.4,
                                        "width": 2
                                    },
                                    "move": {
                                        "enable": true,
                                        "speed": 2,
                                        "direction": "none",
                                        "random": false,
                                        "straight": false,
                                        "out_mode": "out",
                                        "attract": {
                                            "enable": false,
                                            "rotateX": 600,
                                            "rotateY": 1200
                                        }
                                    }
                                },
                                "interactivity": {
                                    "events": {
                                        "onhover": {
                                            "enable": true,
                                            "mode": ["grab"]
                                        },
                                        "onclick": {
                                            "enable": false,
                                            "mode": "bubble"
                                        },
                                        "resize": true
                                    },
                                    "modes": {
                                        "grab": {
                                            "distance": 400,
                                            "line_linked": {
                                                "opacity": 1
                                            }
                                        },
                                        "bubble": {
                                            "distance": 400,
                                            "size": 40,
                                            "duration": 2,
                                            "opacity": 8,
                                            "speed": 3
                                        },
                                        "repulse": {
                                            "distance": 200
                                        },
                                        "push": {
                                            "particles_nb": 4
                                        },
                                        "remove": {
                                            "particles_nb": 2
                                        }
                                    }
                                },
                                "retina_detect": true,
                                "background": {
                                    "color": "#F1802D",
                                    "image": "",
                                    "position": "50% 50%",
                                    "repeat": "no-repeat",
                                    "size": "cover"
                                }
                            }} />
                </div>
                <div>
                    
                </div>
                <Slide direction='right' in={!slide} mountOnEnter unmountOnExit>
                    <Paper sx={{marginTop: '10%',
                                width: '50%',
                                minHeight: '70vh',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                p: 5, 
                                zIndex: 5,
                                backgroundColor: 'rgba(0, 0, 0, 0.35)',
                                boxShadow:       '-1px 4px 57px 40px rgba(34, 60, 80, 0.2)'}}>
                        <Typography sx={{color: '#f6f6f6'}} component='h1' variant='h5'>Регистрация</Typography>
                        <Box component='form' onSubmit={onSubmit} sx={{mt: 1, px: 5, display: 'flex', flexDirection: 'column', alignItems: 'center', zIndex: 4}}>
                            <TextField 
                                sx={{input: {color: '#f6f6f6'}}}
                                margin='normal'
                                required
                                fullWidth
                                id='login'
                                label='Ваше имя'
                                name='login'
                                autoComplete='login'
                                autoFocus />
                            <TextField
                                sx={{input: {color: '#f6f6f6'}}}
                                margin='normal'
                                required
                                fullWidth
                                id='email'
                                label='Ваша почта'
                                name='email'
                                autoComplete='email' />
                            <TextField
                                sx={{input: {color: '#f6f6f6'}}}
                                margin='normal'
                                required
                                fullWidth
                                id='password'
                                label='Ваш пароль'
                                name='password'
                                type='password'
                                autoComplete='password' />
                            <TextField
                                sx={{input: {color: '#f6f6f6'}}}
                                margin='normal'
                                required
                                fullWidth
                                id='password-check'
                                label='Повтор пароля'
                                name='password-check'
                                type='password' />
                            <ToggleButtonGroup value={role} onChange={handleChangeRole} sx={{my: 3}} exclusive>
                                <ToggleButton sx={{color: '#f6f6f6'}} value={roles[0]}>Ученик</ToggleButton>
                                <ToggleButton sx={{color: '#f6f6f6'}} value={roles[1]}>Учитель</ToggleButton>
                                <ToggleButton sx={{color: '#f6f6f6'}} value={roles[2]}>Родитель</ToggleButton>
                            </ToggleButtonGroup>
                            <Button type='submit' variant='contained' fullWidth>Зарегестрироваться</Button>
                            <Link onClick={() => setSlide(true)}>Уже есть аккаунт?</Link>
                        </Box>
                    </Paper>
                </Slide>
                <LogIn slide={slide} restoreSlide={() => setSlide(false)} />
            </Container>
        </Box>
    )
}