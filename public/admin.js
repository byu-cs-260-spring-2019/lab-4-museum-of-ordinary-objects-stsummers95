var app = new Vue({
  el: '#admin',
  data: {
    title: "",
    selected:  "",
    addItem: null,
    photos: [
      {name: 'baseball', id: 1, path: './images/baseball.jpg'},
      {name: 'car', id: 2, path: './images/car.jpg'},
      {name: 'glasses', id: 3, path: './images/glasses.jpg'},
      {name: 'paintbrush', id: 4, path: './images/brush.jpg'},
      {name: 'pen', id: 5, path: './images/pen.jpg'},
      {name: 'scissors', id: 6, path: './images/scissors.jpg'},
      {name: 'shovel', id: 7, path: './images/shovel.jpg'},
      {name: 'slinky', id: 8, path: './images/slinky.jpg'},
      {name: 'palpatine', id: 9, path: './images/palpatine.jpg'},
      {name: 'road', id: 10, path: './images/road.jpg'},
      {name: 'tree', id: 11, path: './images/tree.jpg'},
      {name: 'watch', id: 12, path: './images/watch.jpg'},
    ],
    items: [],
    findTitle: "",
    findItem: null,
  },
  created() {
    this.getItems();
  },
  methods: {
    async addNewItem(){
      try {
        console.log('here');
        console.log('title: ' + this.title)
        console.log('selected: ' + this.selected.name)
        console.log('path: ' + this.selected.path)
        let result = await axios.post('/api/items', {
          title: this.title,
          path: this.selected.path
        });
        this.addItem = result.data;
      } catch (error) {
        console.log(error);
      }
    },
    async getItems() {
      try {
        let response = await axios.get("/api/items");
        this.items = response.data;
        return true;
      } catch (error) {
        console.log(error);
      }
    },
    selectItem(item) {
      this.findTitle = "";
      this.findItem = item;
    },
    async deleteItem(item) {
      try {
        console.log('ID: ' + item.id);
        let response = await axios.delete("/api/items/" + item.id);
        this.findItem = null;
        this.getItems();
        return true;
      } catch (error) {
        console.log(error);
      }
    },
    async editItem(item) {
      try {
        let response = await axios.put("/api/items/" + item.id, {
          title: this.findItem.title
        });
        this.findItem = null;
        this.getItems();
        return true;
      } catch (error) {
        console.log(error);
      }
    },
  },
  computed: {
    suggestions() {
      return this.items.filter(item => item.title.toLowerCase().startsWith(this.findTitle.toLowerCase()));
    }
  }
});
