import React from "react"
import { Card, CardContent, Typography, Grid } from "@material-ui/core"
import CountUp from "react-countup"
import cx from "classnames"

import styles from "./Cards.module.css"

const RegionCards = ({ data }) => {
  return (
    <>
      {!data ? (
        "Loading..."
      ) : (
        <div className={styles.container}>
          <Grid container spacing={5} justifyContent="center">
            <Grid
              item
              component={Card}
              xs={12}
              md={2}
              className={cx(styles.card, styles.infected)}
            >
              <CardContent>
                <Typography color="textSecondary" gutterBottom>
                  Infectados
                </Typography>
                <Typography variant="h5" gutterBottom>
                  <CountUp
                    start={0}
                    end={data.todayConfirmed}
                    duration={2.5}
                    separator="."
                  />
                </Typography>
                <Typography color="textSecondary">
                  {new Date(data.lastUpdate).toDateString()}
                </Typography>
                <Typography variant="body2">
                  Numero total de infectados por COVID-19 hoy
                </Typography>
              </CardContent>
            </Grid>
            <Grid
              item
              component={Card}
              xs={12}
              md={2}
              className={cx(styles.card, styles.recovered)}
            >
              <CardContent>
                <Typography color="textSecondary" gutterBottom>
                  Nuevos Casos
                </Typography>
                <Typography variant="h5" gutterBottom>
                  <CountUp
                    start={0}
                    end={data.newCases}
                    duration={2.5}
                    separator="."
                  />
                </Typography>
                <Typography color="textSecondary">
                  {new Date(data.lastUpdate).toDateString()}
                </Typography>
                <Typography variant="body2">
                  Numero total de nuevos casos hoy
                </Typography>
              </CardContent>
            </Grid>
            <Grid
              item
              component={Card}
              xs={12}
              md={2}
              className={cx(styles.card, styles.deaths)}
            >
              <CardContent>
                <Typography color="textSecondary" gutterBottom>
                  Muertes
                </Typography>
                <Typography variant="h5" gutterBottom>
                  <CountUp
                    start={0}
                    end={data.newDeaths}
                    duration={2.5}
                    separator="."
                  />
                </Typography>
                <Typography color="textSecondary">
                  {new Date(data.lastUpdate).toDateString()}
                </Typography>
                <Typography variant="body2">
                  Numero total de nuevas muertes hoy
                </Typography>
              </CardContent>
            </Grid>
            <Grid
              item
              component={Card}
              xs={12}
              md={2}
              className={cx(styles.card, styles.critical)}
            >
              <CardContent>
                <Typography color="textSecondary" gutterBottom>
                  Criticos 
                </Typography>
                <Typography variant="h5" gutterBottom>
                  <CountUp
                    start={0}
                    end={data.critical}
                    duration={2.5}
                    separator="."
                  />
                </Typography>
                <Typography color="textSecondary">
                  {new Date(data.lastUpdate).toDateString()}
                </Typography>
                <Typography variant="body2">
                  Numero total de personas ingresadas en UCIs hoy
                </Typography>
              </CardContent>
            </Grid>
          </Grid>
        </div>
      )}
    </>
  )
}

export default RegionCards
