import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Rating from '@mui/material/Rating';
import Box from '@mui/material/Box';
import StarIcon from '@mui/icons-material/Star';
import "./feedback.css";

const labels = {
  0.5: 'Useless',
  1: 'Useless+',
  1.5: 'Poor',
  2: 'Poor+',
  2.5: 'Ok',
  3: 'Ok+',
  3.5: 'Good',
  4: 'Good+',
  4.5: 'Excellent',
  5: 'Excellent+',
};

function getLabelText(value) {
  return `${value} Star${value !== 1 ? 's' : ''}, ${labels[value]}`;
}

const feedbackData = [
  {
    id: 1,
    avatar: "/static/images/avatar/1.jpg",
    primaryText: "Brunch this weekend?",
    secondaryText: "Ali Connors — Very helpful!",
    rating: 2,
  },
  {
    id: 2,
    avatar: "/static/images/avatar/2.jpg",
    primaryText: "Lunch with family?",
    secondaryText: "Sandra Adams — Amazing service!",
    rating: 4,
  },
  {
    id: 3,
    avatar: "/static/images/avatar/3.jpg",
    primaryText: "Dinner party feedback?",
    secondaryText: "Trevor Hansen — Great ambiance!",
    rating: 3.5,
  },
];

export default function AlignItemsList() {
  const [ratings, setRatings] = React.useState(
    feedbackData.reduce((acc, item) => ({ ...acc, [item.id]: item.rating }), {})
  );

  const [isTextVisible, setIsTextVisible] = React.useState(false);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setIsTextVisible(true);
    }, 500); // Delay before showing the text
    return () => clearTimeout(timer); // Cleanup timer
  }, []);

  const handleRatingChange = (id, newValue) => {
    setRatings((prevRatings) => ({
      ...prevRatings,
      [id]: newValue,
    }));
  };

  return (
    <div className="feedback-container">
      <div className="feedback-list">
        <List sx={{ bgcolor: 'background.paper' }}>
          {feedbackData.map((feedback) => (
            <React.Fragment key={feedback.id}>
              <ListItem alignItems="flex-start">
                <ListItemAvatar>
                  <Avatar alt={feedback.primaryText} src={feedback.avatar} sx={{ bgcolor: 'primary.main' }} />
                </ListItemAvatar>
                <ListItemText
                  primary={feedback.primaryText}
                  secondary={
                    <React.Fragment>
                      <Typography
                        component="span"
                        variant="body2"
                        sx={{ color: 'text.primary', display: 'inline' }}
                      >
                        {feedback.secondaryText.split(" — ")[0]}
                      </Typography>
                      {" — " + feedback.secondaryText.split(" — ")[1]}
                    </React.Fragment>
                  }
                />
              </ListItem>
              <Divider variant="inset" component="li" />
              <Box sx={{ width: 200, display: 'flex', alignItems: 'center' }}>
                <Rating
                  name={`hover-feedback-${feedback.id}`}
                  value={ratings[feedback.id]}
                  precision={0.5}
                  getLabelText={getLabelText}
                  onChange={(event, newValue) => handleRatingChange(feedback.id, newValue)}
                  emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
                />
                {ratings[feedback.id] !== null && <Box sx={{ ml: 2 }}>{labels[ratings[feedback.id]]}</Box>}
              </Box>
            </React.Fragment>
          ))}
        </List>
      </div>

      {/* Sliding Text Section */}
      <div className={`sliding-text-container ${isTextVisible ? "visible" : ""}`}>
        <h2>Our Customer Feedback</h2>
        <p>
          Your feedback is invaluable to us. It helps us improve and provide a better experience for all our users. 
          Thank you for taking the time to share your thoughts!
        </p>
      </div>
    </div>
  );
}
