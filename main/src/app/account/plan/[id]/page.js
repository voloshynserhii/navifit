'use client'
import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { Box, Card, CardContent, CardMedia, CardActionArea, Divider, Stack, Tabs, Tab, Typography } from '@mui/material';
import Details from '../components/Details'
import api from '../../../../utils/api'
import { useAppStore } from '../../../../store';

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const MyPlan = () => {
  const router = useRouter()
  const { id } = useParams()
  const [state] = useAppStore();
  const [value, setValue] = useState(0);
  const [plan, setPlan] = useState([]);
  const [selectedDish, setSelectedDish] = useState();
  const [day, setDay] = useState()
  const { isAdmin, currentUser } = state

  const getUser = async () => {    
    if (isAdmin || currentUser) {
      const { user } = await api.user.getUser({ id })

      if (user.currentPlan) setPlan(user.currentPlan)
    } else {
      router.push('/')
    }
  }

  useEffect(() => {
    getUser()
  }, [id])

  const handleChange = (_, newValue) => {
    setValue(newValue);
  };

  const week = 'week' + `${value + 1}`
  const mealTypes = ['breakfast', 'branch', 'lunch', 'dinner']

  return (
    <main>
      <Details selectedDish={selectedDish} week={value} day={day} userId={currentUser?._id} onChangeUserPlan={(newPlan) => setPlan(newPlan)} />
      <Stack alignItems="center">
        <Typography variant="h3">My Plan</Typography>
        <Tabs
          sx={{ width: '80vw', marginTop: 5 }}
          value={value}
          onChange={handleChange}
          textColor="secondary"
          indicatorColor="secondary"
          aria-label="secondary tabs example"
        >
          <Tab sx={{ width: '25%' }} {...a11yProps(0)} label="Week One" />
          <Tab sx={{ width: '25%' }} {...a11yProps(1)} label="Week Two" />
          <Tab sx={{ width: '25%' }} {...a11yProps(2)} label="Week Three" />
          <Tab sx={{ width: '25%' }} {...a11yProps(3)} label="Week Four" />
        </Tabs>
        {plan[week]?.map((day, i) => (
          <Stack key={day.breakfast._id + day.lunch._id} gap={2} sx={{ marginTop: 5 }}>
            <Typography variant="h3" component="div">
              Day {i + 1}
            </Typography>
            <Stack direction={{ xs: 'column', md: 'row' }} gap={2} sx={{ width: '80vw' }}>
              {mealTypes.map(mealType => (
                <Box key={mealType + i} sx={{ width: { xs: '100%', md: '25%' }, height: '100%' }} >
                  <Card sx={{ width: '100%', height: '100%' }} onClick={() => {
                    setSelectedDish(day[mealType])
                    setDay(i)
                  }}>
                    <CardActionArea sx={{ height: '100%' }}>
                      <CardMedia
                        component="img"
                        // height="140"
                        image="https://picsum.photos/300/300"
                        alt=""
                      />
                      <CardContent sx={{ position: 'absolute', bottom: 0, width: '100%' }} >
                        <Typography gutterBottom variant="h5" component="div" sx={{ textAlign: 'center', color: 'white' }}>
                          {day[mealType].name}
                        </Typography>

                      </CardContent>
                    </CardActionArea>
                  </Card>
                  <Typography sx={{ textAlign: 'center', marginTop: 3 }} variant="h4" color="text.secondary">
                    {mealType}
                  </Typography>
                </Box>
              ))}
            </Stack>
            <Divider />
          </Stack>
        ))}
      </Stack >
    </main >
  );
};

export default MyPlan;