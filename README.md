# cc12-project.continuous-delivery-vue
### This was created during my time as a [Code Chrysalis](https://codechrysalis.io) Student


## Change Log
- Added an .Env File. To locally connect to your database, please add a .env file to your workspace root folder.
- USER = "your user name without the quotes"
- PASSWORD = "your password without the quotes"


## API
**GET** `/api/locations` returns JSON data of locations
 
 
## Database Schema
**Table** `locations`
- id
- latitude
- longitude
- site_name
- name
- state
- city
- highway
- type
- highway_exit_num,
- street_address,
- telephone,
- fax

**Table** `amenities`
- id
- location_id
- name

**Table** `truck_services`
- id
- location_id
- name

**Table** `restaurants`
- id
- location_id
- name


## Steps to Setting Local Database
If you have a truckstop database created already run the following:
1. Enter `psql` in your terminal
2. `drop database truckstop;`
3. `create database truckstop;`
4. `\c truckstop;`
5. `SHOW config_file;` will return the path to your config file. **Copy the path**
6. `\q` to exit PostgreSQL
7. `vim  [PASTE YOUR PATH THAT YOU COPIED]`
8. Locate `max_connections` in the file and change its value to **500**
9. Click esc and enter `:wq`
10. `brew services restart postgresql`
11. `psql`
12. Enter `SHOW max_connections;` and the value should be changed to **500**

## Steps above for Window Users
1. STEPS TO SETTING LOCAL DATABASE (windows users)
2. Login to your psql as you usually do, then `\c truckstop`
3. Once you're there, type `SHOW config_file;`
4. Copy the path printed when you enter the above command
5. Open up a windows explorer, and go to that folder where the config file is (it should end with a .conf)
6. Open up with notepad ++ if you have it or notepad
7. Locate the term `max_connections`
8. Change the value from `100` to `500`
9. Restart your computer or restart postgresql
10. Log in to your `truckstop database`, and type `SHOW max_connections;`
11. If you did it right, it should show 500 


## Connecting to Heroku Database
```
heroku pg:psql -a cc12-vue-project
```

Pushing local database to heroku:
```
heroku pg:push truckstop DATABASE_URL -a cc12-vue-project
```
