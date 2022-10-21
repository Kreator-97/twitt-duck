import { Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react'

export const CustomTabs = () => {
  return (
    <Tabs
      colorScheme='cyan'
      mb='4'
    >
      <TabList>
        <Tab>
          Publicaciones
        </Tab>
        <Tab
        >
          Me gustas</Tab>
        <Tab
        >
          Galeria
        </Tab>
      </TabList>

      {/* <TabPanels>
        <TabPanel>
          <p>one!</p>
        </TabPanel>
        <TabPanel>
          <p>two!</p>
        </TabPanel>
        <TabPanel>
          <p>three!</p>
        </TabPanel>
      </TabPanels> */}
    </Tabs>
  )
}
