import { observer } from "mobx-react-lite";
import { useContext } from "react";
import {
  Box,
  Grid,
  Paper,
  Typography,
  Card,
  CardContent,
  Button,
  List,
  ListItem,
  ListItemText,
  Divider
} from "@mui/material";
import {
  ShoppingCart,
  Inventory,
  AttachMoney,
  People,
  TrendingUp,
  Warning
} from "@mui/icons-material";
import { Context } from "../main";

const StatCard = ({ title, value, icon, color = "#1976d2" }: any) => (
  <Card sx={{ height: '100%' }}>
    <CardContent>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Box>
          <Typography color="textSecondary" gutterBottom variant="h6">
            {title}
          </Typography>
          <Typography variant="h4" component="div">
            {value}
          </Typography>
        </Box>
        <Box sx={{ color }}>
          {icon}
        </Box>
      </Box>
    </CardContent>
  </Card>
);

const DashboardPage = observer(() => {
  const { store } = useContext(Context);

  const stats = {
    totalOrders: 156,
    totalProducts: 89,
    totalRevenue: "124,560 ₽",
    newCustomers: 23,
    lowStockProducts: 5,
    pendingOrders: 12
  };

  const recentActivities = [
    { id: 1, action: "Новый заказ #12345", time: "10 минут назад" },
    { id: 2, action: "Товар 'Смеситель' обновлен", time: "2 часа назад" },
    { id: 3, action: "Пользователь зарегистрирован", time: "5 часов назад" },
    { id: 4, action: "Заказ #12344 выполнен", time: "Вчера" },
  ];

  const lowStockItems = [
    { id: 1, name: "Фильтр для воды", stock: 2 },
    { id: 2, name: "Шланг 1/2", stock: 3 },
    { id: 3, name: "Кран шаровой", stock: 1 },
  ];

  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <Typography variant="h4" component="h1" gutterBottom sx={{ mb: 4 }}>
        Панель управления
      </Typography>

      {/* Исправленный Grid */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={4} >
          <StatCard
            title="Всего заказов"
            value={stats.totalOrders}
            icon={<ShoppingCart sx={{ fontSize: 40 }} />}
            color="#1976d2"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <StatCard
            title="Товаров в каталоге"
            value={stats.totalProducts}
            icon={<Inventory sx={{ fontSize: 40 }} />}
            color="#2e7d32"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <StatCard
            title="Общая выручка"
            value={stats.totalRevenue}
            icon={<AttachMoney sx={{ fontSize: 40 }} />}
            color="#ed6c02"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <StatCard
            title="Новых клиентов"
            value={stats.newCustomers}
            icon={<People sx={{ fontSize: 40 }} />}
            color="#9c27b0"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <StatCard
            title="Заказов в обработке"
            value={stats.pendingOrders}
            icon={<TrendingUp sx={{ fontSize: 40 }} />}
            color="#d32f2f"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <StatCard
            title="Товаров мало на складе"
            value={stats.lowStockProducts}
            icon={<Warning sx={{ fontSize: 40 }} />}
            color="#ff9800"
          />
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Последние действия
            </Typography>
            <List>
              {recentActivities.map((activity, index) => (
                <Box key={activity.id}>
                  <ListItem>
                    <ListItemText
                      primary={activity.action}
                      secondary={activity.time}
                    />
                  </ListItem>
                  {index < recentActivities.length - 1 && <Divider />}
                </Box>
              ))}
            </List>
            <Button variant="outlined" sx={{ mt: 2 }}>
              Показать все
            </Button>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom color="warning.main">
              Мало на складе
            </Typography>
            <List>
              {lowStockItems.map((item, index) => (
                <Box key={item.id}>
                  <ListItem>
                    <ListItemText
                      primary={item.name}
                      secondary={`Осталось: ${item.stock} шт.`}
                    />
                    <Button size="small" variant="contained" color="warning">
                      Заказать
                    </Button>
                  </ListItem>
                  {index < lowStockItems.length - 1 && <Divider />}
                </Box>
              ))}
            </List>
            <Button variant="outlined" sx={{ mt: 2 }}>
              Все товары
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
});

export default DashboardPage;