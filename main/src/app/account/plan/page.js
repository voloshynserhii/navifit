'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardMedia, CardActionArea, Stack, Tabs, Tab, Typography } from '@mui/material';
import api from '../../../utils/api'
import { useAppStore } from '../../../store';

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const MyPlan = () => {
  const router = useRouter()
  const [state, dispatch] = useAppStore();
  const [value, setValue] = useState(0);
  const [plan, setPlan] = useState([]);

  const { isAuthenticated } = state
  
  const getPlan = async () => {
    const { month } = await api.plan.getOptions(process.env.NEXT_PUBLIC_DB_HOST, {})
    
    if (month) setPlan(month)
  }

  useEffect(() => {
    getPlan()
  }, []);

  useEffect(() => {
    if (!isAuthenticated) router.push('/')
  }, [isAuthenticated])
  
  const handleChange = (_, newValue) => {
    setValue(newValue);
  };

  const week = 'week' + `${value + 1}`

  return (
    <main>
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
            <Stack direction='row' gap={2} sx={{ width: '80vw' }}>
              <Card sx={{ width: '25%' }}>
                <CardActionArea>
                  {/* <CardMedia
                  component="img"
                  height="140"
                  image="/static/images/cards/contemplative-reptile.jpg"
                  alt="green iguana"
                /> */}
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {day.breakfast.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {day.breakfast.description}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
              <Card sx={{ width: '25%' }}>
                <CardActionArea>
                  {/* <CardMedia
                  component="img"
                  height="140"
                  image="/static/images/cards/contemplative-reptile.jpg"
                  alt="green iguana"
                /> */}
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {day.branch.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {day.branch.description}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
              <Card sx={{ width: '25%' }}>
                <CardActionArea>
                  {/* <CardMedia
                  component="img"
                  height="140"
                  image="/static/images/cards/contemplative-reptile.jpg"
                  alt="green iguana"
                /> */}
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {day.lunch.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {day.lunch.description}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
              <Card sx={{ width: '25%' }}>
                <CardActionArea>
                  {/* <CardMedia
                  component="img"
                  height="140"
                  image="/static/images/cards/contemplative-reptile.jpg"
                  alt="green iguana"
                /> */}
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {day.dinner.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {day.dinner.description}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Stack>
          </Stack>
        ))}
      </Stack >
    </main >
  );
};

export default MyPlan;