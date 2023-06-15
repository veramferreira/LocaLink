
    <View>
      <Text>Community Name:</Text>
      <TextInput value={name} onChangeText={setName}></TextInput>

      <Text>Description:</Text>
      <TextInput value={description} onChangeText={setDescription}></TextInput>

      <Text>Postcode:</Text>
      <TextInput value={postcode} onChangeText={setPostcode}></TextInput>

      <Text>Image URL:</Text>
      <TextInput value={img} onChangeText={setImg}></TextInput>

      <Text>Management:</Text>
      <View>
        {management.map((manager: any, index: number) => {
          return (
            <View key={index}>
              <Text>{`Management ${index + 1} Name:`}</Text>
              <TextInput
                value={manager.name}
                onChangeText={(text) => updateManagement(index, "name", text)}
              ></TextInput>
              <Text>{`Management ${index + 1} Image URL:`}</Text>
              <TextInput
                value={manager.img}
                onChangeText={(text) => updateManagement(index, "img", text)}
              ></TextInput>
            </View>
          );
        })}
      </View>

      <TouchableOpacity onPress={addManagement}>
        <Text>Add A Manager</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={removeManagement}>
        <Text>Remove A Manager</Text>
      </TouchableOpacity>

      <Text>Useful Contacts:</Text>
      <View>
        {contacts.map((contact: any, index: number) => {
          return (
            <View key={index}>
              <Text>{`Contact ${index + 1} Name:`}</Text>
              <TextInput
                value={contact.name}
                onChangeText={(text) => updateContacts(index, "name", text)}
              ></TextInput>
              <Text>{`Contact ${index + 1} Contact Info:`}</Text>
              <TextInput
                value={contact.contactInfo}
                onChangeText={(text) =>
                  updateContacts(index, "contactInfo", text)
                }
              ></TextInput>
            </View>
          );
        })}
      </View>

      <TouchableOpacity onPress={addContact}>
        <Text>Add A Contact</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={removeContact}>
        <Text>Remove A Contact</Text>
      </TouchableOpacity>
    </View>