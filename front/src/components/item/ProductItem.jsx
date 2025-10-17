import React, { useState } from "react";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  IconButton,
  Box,
  Button,
  Select,
  MenuItem
} from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ScaleIcon from "@mui/icons-material/Scale";

const ProductItem = ({ product, onClick }) => {
  const { name, images = [], prices, stock } = product;
  const [hovered, setHovered] = useState(false);

  return (
    <Card
      sx={{
        position: "relative",
        width: 300,
        borderRadius: 2,
        boxShadow: 3,
        cursor: "pointer",
        overflow: "hidden",
        "&:hover": { boxShadow: 6 }
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={onClick}
    >
      {/* Картинка или чертеж */}
      <CardMedia
        component="img"
        height="200"
        image={hovered ? (images[1] || images[0]) : images[0]}
        alt={name}
        onError={(e) => {
          e.target.src = "/images/product-placeholder.jpg";
        }}
        sx={{ objectFit: "contain", backgroundColor: "#fff" }}
      />

      {/* Кнопки сверху */}
      <Box
        sx={{
          position: "absolute",
          top: 8,
          left: 8,
          display: "flex",
          gap: 1
        }}
      >
        <IconButton size="small">
          <FavoriteBorderIcon />
        </IconButton>
        <IconButton size="small">
          <ScaleIcon />
        </IconButton>
      </Box>

      {/* Контент */}
      <CardContent>
        <Typography
          variant="subtitle1"
          component="h3"
          sx={{ fontWeight: 600, textAlign: "center", mb: 1 }}
        >
          {name}
        </Typography>

        <Typography
          variant="h6"
          sx={{ fontWeight: 700, textAlign: "center", mb: 2 }}
        >
          {prices.retail} {prices.currency} / шт
        </Typography>

        {/* При наведении — выпадашка и кнопка */}
        {hovered && (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 1
            }}
          >
            {/* <Select
              size="small"
              defaultValue={name}
              sx={{ minWidth: 200 }}
              disabled
            >
              <MenuItem value={name}>{name}</MenuItem>
            </Select> */}

            <Button
              variant="contained"
              fullWidth
              disabled={stock?.available <= 0}
              sx={{
                backgroundColor: "#add8e6",
                color: "#000000",
                "&:hover": {
                  backgroundColor: "#8bc3d8", // Темнее при hover
                },
                "&:disabled": {
                  backgroundColor: "#e0e0e0",
                  color: "#9e9e9e"
                }
              }}
            >
              {stock?.available > 0 ? "В корзину" : "Ожидается"}
            </Button>
          </Box>
        )}
      </CardContent>
    </Card>
  );
};

export default ProductItem;
