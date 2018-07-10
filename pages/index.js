import React from 'react'

import { ThemeProvider } from 'emotion-theming'
import fetch from 'unfetch'
import styled from 'react-emotion'
import { Border, Box, Card as BaseCard, Divider, Flex, Heading, Tab, Tabs, Text } from 'rebass/emotion'
import { border, borderColor, borderRadius, width } from 'styled-system'

import theme from '../theme'

const airtableGet = type =>
  fetch(
    `https://api.airtable.com/v0/appR2xfn1nBo8QTw2/${type}`,
    {
      headers: {
        Authorization: `Bearer keyyv4i831MsFqNvR`
    }}
  )

const Card = styled(
  ({ border, borderColor, ...props }) =>
    <BaseCard {...props} />)(border, borderColor)


const MenuTabs = ({ menus, selectedMenu, setMenu }) =>
  <Tabs>
    {getMenuOrder(menus).map(id => menus[id]).map(item =>
      <Tab
        borderColor={item.id === selectedMenu ? 'blue' : undefined}
        key={item.Name}
        onClick={() => setMenu(item.id)}
      >
        {item.Name}
      </Tab>
    )}
  </Tabs>

const MenuContents = ({ ingredients, menu, menuItems }) =>
  <Box mt={3}>
    {menu.MenuItems.map(itemId =>
      <div key={itemId}>
        <Text fontSize={3} mt={2} fontWeight='bold'>
          {menuItems[itemId].Name}
        </Text>
        <Text fontSize={1} mt={1} ml={3}>
          {menuItems[itemId].IngredientMenuItem
            .map(itemId => ingredients[itemId])
            .sort((a, b) => a.DisplayOrder - b.DisplayOrder)
            .map(item => item.Ingredient.Name)
            .join(', ')
          }
        </Text>
        <Divider borderColor='gray.3' css={{ marginTop: 0 }} />
      </div>
    )}
  </Box>

// TODO(nathan): Make boxShadow work
const IndexPresentation = ({ ingredients, menuItems, menus, selectedMenu, setMenu }) =>
  <ThemeProvider theme={theme}>
    <Flex justifyContent='center'>
      <Box width={[1, 3/4, 1/2]}>
        <Card bg='gray.4' border={1} borderColor='gray.3' borderRadius={1}>
          <Box m={2}>
            <Heading mb={2}>Chez Nathan</Heading>
            <MenuTabs menus={menus} selectedMenu={selectedMenu} setMenu={setMenu} />
            <MenuContents ingredients={ingredients} menu={menus[selectedMenu]} menuItems={menuItems} />
          </Box>
        </Card>
      </Box>
    </Flex>
  </ThemeProvider>

const reshapeJson = json =>
  Object.assign(...json.records
    .map(item => ({ [item.id]: { ...item.fields, id: item.id }})))

const reshapeIngredients = (ingredientMenuItems, ingredients) =>
  Object.assign(
    ...Object.keys(ingredientMenuItems)
      .map(id => ingredientMenuItems[id])
      .map(item => ({
        [item.id]: {
          ...item,
          Ingredient: ingredients[item.Ingredient]
        }
      })))

const getMenuOrder = menus => Object.keys(menus).sort((a, b) => menus[a].DisplayOrder - menus[b].DisplayOrder)

class Index extends React.Component {
  state = {}

  async componentDidMount () {
    const menus = reshapeJson(await (await airtableGet('Menu')).json())

    this.setState({
      menus,
      menuItems: reshapeJson(await (await airtableGet('MenuItem')).json()),
      ingredients: reshapeIngredients(
        reshapeJson(await (await airtableGet('IngredientMenuItem')).json()),
        reshapeJson(await (await airtableGet('Ingredient')).json())),
      selectedMenu: getMenuOrder(menus)[0]
    })
  }

  setMenu = name => this.setState({ selectedMenu: name })

  render () {
    console.log(this.state.ingredients)
    return (
      !this.state.selectedMenu
      ? <div />
      : <IndexPresentation
          ingredients={this.state.ingredients}
          menuItems={this.state.menuItems}
          menus={this.state.menus}
          selectedMenu={this.state.selectedMenu}
          setMenu={this.setMenu}
        />
    )
  }
}

export default Index
