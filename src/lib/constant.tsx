import {
  Balcony,
  Bathtub,
  CleaningServices,
  DirectionsBike,
  FireExtinguisher,
  FitnessCenter,
  GppGood,
  LocalOffer,
  LocalParking,
  MedicalServices,
  OutdoorGrill,
  Pool,
  SentimentVerySatisfied,
  Spa,
  Wifi,
  Tv,
  AcUnit,
  Microwave,
  Yard,
} from "@mui/icons-material";

export const reviews = [
  {
    value: "clean",
    icon: <CleaningServices />,
    text: "Clean",
  },
  {
    value: "security",
    icon: <GppGood />,
    text: "Security",
  },
  {
    value: "satisfied",
    icon: <SentimentVerySatisfied />,
    text: "Satisfied",
  },
  {
    value: "ekonomis",
    icon: <LocalOffer />,
    text: "Ekonomis",
  },
];

export const facilities = [
  {
    value: "wifi",
    icon: <Wifi sx={{ fontSize: "40px" }} />,
    text: "Wifi",
  },
  {
    value: "bathub",
    icon: <Bathtub sx={{ fontSize: "40px" }} />,
    text: "Bathub",
  },
  {
    value: "balcony",
    icon: <Balcony sx={{ fontSize: "40px" }} />,
    text: "Balkon",
  },
  {
    value: "park",
    icon: <LocalParking sx={{ fontSize: "40px" }} />,
    text: "Parkiran",
  },

  {
    value: "firstaid",
    icon: <MedicalServices sx={{ fontSize: "40px" }} />,
    text: "Pertolongan Pertama",
  },
  {
    value: "grill",
    icon: <OutdoorGrill sx={{ fontSize: "40px" }} />,
    text: "Pemanggang Daging",
  },
  {
    value: "spa",
    icon: <Spa sx={{ fontSize: "40px" }} />,
    text: "Spa",
  },
  {
    value: "gym",
    icon: <FitnessCenter sx={{ fontSize: "40px" }} />,
    text: "Gym",
  },
  {
    value: "pool",
    icon: <Pool sx={{ fontSize: "40px" }} />,
    text: "Kolam Renang",
  },
  {
    value: "extinguisher",
    icon: <FireExtinguisher sx={{ fontSize: "40px" }} />,
    text: "Pemadam Kebakaran",
  },
  {
    value: "bicycle",
    icon: <DirectionsBike sx={{ fontSize: "40px" }} />,
    text: "Sepeda",
  },
  {
    value: "ac",
    icon: <AcUnit sx={{ fontSize: "40px" }} />,
    text: "AC",
  },
  {
    value: "tv",
    icon: <Tv sx={{ fontSize: "40px" }} />,
    text: "TV",
  },
  {
    value: "garden",
    icon: <Yard sx={{ fontSize: "40px" }} />,
    text: "Taman",
  },
  {
    value: "microwave",
    icon: <Microwave sx={{ fontSize: "40px" }} />,
    text: "Microwave",
  },
];
