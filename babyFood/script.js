const babyMealsDB = [
    // --- BREAKFAST (20) ---
    { id: 'b1', name: 'Apple & Cinnamon Mash', cat: 'Breakfast', age: '6m+', cal: 85, p: '1g', c: '21g', f: '0g', img: 'https://rachaelsgoodeats.com/wp-content/uploads/2020/11/230904_applesauce-21-1024x1536.jpg', benefits: 'High fiber for digestion.', ingredients: ['Apple', 'Cinnamon'], instructions: 'Steam and mash.' },
    { id: 'b2', name: 'Creamy Oat Porridge', cat: 'Breakfast', age: '6m+', cal: 110, p: '4g', c: '18g', f: '2g', img: 'https://cardamomandtea.com/wp-content/uploads/2021/03/IMG_6404-min-copy-2-1024x683.webp', benefits: 'Iron-fortified energy.', ingredients: ['Oats', 'Milk'], instructions: 'Cook oats in milk.' },
    { id: 'b4', name: 'Pear & Blueberry Swirl', cat: 'Breakfast', age: '6m+', cal: 75, p: '1g', c: '17g', f: '0g', img: 'https://3catsfoodie.com/wp-content/uploads/2022/08/8F4B607D-CE2B-43D8-B1A3-BAACFD64058C_1_201_a-768x639.jpeg', benefits: 'Antioxidant boost.', ingredients: ['Pear', 'Blueberries'], instructions: 'Steam and puree.' },
    { id: 'b5', name: 'Soft Scrambled Yolks', cat: 'Breakfast', age: '9m+', cal: 140, p: '12g', c: '1g', f: '10g', img: 'https://assets.epicurious.com/photos/592f21760442334374e30254/1:1/w_2560%2Cc_limit/SaltiesSoftScrambledEggs_ALLABOUTEGGS.jpg', benefits: 'Choline for brain.', ingredients: ['Egg yolks'], instructions: 'Scramble softly.' },
    { id: 'b6', name: 'Mango Greek Yogurt', cat: 'Breakfast', age: '9m+', cal: 110, p: '8g', c: '12g', f: '4g', img: 'https://i.ytimg.com/vi/J8I1fDh1fCE/maxresdefault.jpg', benefits: 'Probiotics.', ingredients: ['Mango', 'Yogurt'], instructions: 'Mix puree into yogurt.' },
    { id: 'b7', name: 'Pumpkin Spice Oats', cat: 'Breakfast', age: '7m+', cal: 105, p: '3g', c: '19g', f: '2g', img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQjnSks0es_bIJ_iTX4nxjcMPz84HMVGn4idw&s', benefits: 'Vitamin A.', ingredients: ['Pumpkin', 'Oats'], instructions: 'Stir pumpkin into oats.' },
    { id: 'b8', name: 'Chia Seed Pudding', cat: 'Breakfast', age: '1yr+', cal: 130, p: '4g', c: '10g', f: '9g', img: 'https://www.eatingbirdfood.com/wp-content/uploads/2023/12/chia-pudding-angled-500x500.jpg', benefits: 'Omega-3 fats.', ingredients: ['Chia', 'Coconut milk'], instructions: 'Soak seeds overnight.' },
    { id: 'b9', name: 'Papaya Mash', cat: 'Breakfast', age: '8m+', cal: 65, p: '1g', c: '15g', f: '0g', img: 'https://static.toiimg.com/thumb/68684992.cms?imgsize=522800&width=800&height=800', benefits: 'Digestive enzymes.', ingredients: ['Papaya'], instructions: 'Mash until smooth.' },
   
    { id: 'b12', name: 'Millet Porridge', cat: 'Breakfast', age: '6m+', cal: 95, p: '3g', c: '20g', f: '1g', img: 'https://www.myplantifulcooking.com/wp-content/uploads/2023/09/millet-porridge-featured.jpg', benefits: 'Gluten-free.', ingredients: ['Millet'], instructions: 'Boil until soft.' },
    { id: 'b13', name: 'Prune & Pear Puree', cat: 'Breakfast', age: '6m+', cal: 80, p: '1g', c: '20g', f: '0g', img: 'https://3catsfoodie.com/wp-content/uploads/2023/05/AAA79565-CEF3-46E3-A926-7038380AA3B5_1_201_a-1024x751.jpeg', benefits: 'Digestion.', ingredients: ['Prunes', 'Pears'], instructions: 'Steam and blend.' },
    { id: 'b14', name: 'Almond Butter Swirl', cat: 'Breakfast', age: '1yr+', cal: 150, p: '5g', c: '8g', f: '12g', img: 'https://www.happyveggiekitchen.com/wp-content/uploads/2018/03/1-IMG_3590-001.jpg', benefits: 'Vitamin E.', ingredients: ['Nut butter', 'Oats'], instructions: 'Stir into oats.' },
    { id: 'b15', name: 'Cottage Cheese & Peach', cat: 'Breakfast', age: '10m+', cal: 115, p: '10g', c: '12g', f: '3g', img: 'https://www.cardiomenderweightloss.com/wp-content/uploads/2020/08/CottageCheesePeaches-2.jpg', benefits: 'Calcium.', ingredients: ['Cheese', 'Peaches'], instructions: 'Mix together.' },
       { id: 'b17', name: 'Strawberry Semolina', cat: 'Breakfast', age: '9m+', cal: 130, p: '4g', c: '25g', f: '2g', img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRvsMrDVTK5I6baiT2xmua8s65oMeNGxx3hcQ&s', benefits: 'Vitamin C.', ingredients: ['Semolina', 'Berries'], instructions: 'Cook semolina.' },
    { id: 'b18', name: 'Buckwheat Cream', cat: 'Breakfast', age: '7m+', cal: 100, p: '4g', c: '20g', f: '1g', img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQdCpIfyG6HJAS5ZrIAVTUzQQJ81hUoBWgRMQ&s', benefits: 'Magnesium.', ingredients: ['Buckwheat'], instructions: 'Boil soft.' },
    { id: 'b19', name: 'Kiwi & Apple Smash', cat: 'Breakfast', age: '10m+', cal: 70, p: '1g', c: '16g', f: '0g', img: 'https://image.jimcdn.com/app/cms/image/transf/none/path/s4646b755a50b5caf/image/i8810ceaf5e0d3325/version/1448027217/this-kiwi-apple-green-smoothie-is-beautiful-and-light-perfect-for-clean-eating.jpg', benefits: 'Immunity.', ingredients: ['Kiwi', 'Apple'], instructions: 'Mash together.' },
    

    // --- SIDES & PUREES (20) ---
    
    { id: 's2', name: 'Golden Carrot', cat: 'Sides & Purees', age: '6m+', cal: 45, p: '1g', c: '10g', f: '0g', img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSxB0tPvHB37hoJScWM3719mraMrB4w4i65ZA&s', benefits: 'Vitamin A.', ingredients: ['Carrots'], instructions: 'Steam and blend.' },
    { id: 's3', name: 'Sweet Potato Velvet', cat: 'Sides & Purees', age: '6m+', cal: 90, p: '2g', c: '20g', f: '0g', img: 'https://i.pinimg.com/736x/f8/be/48/f8be4863897e581355a9a154c45b08b4.jpg', benefits: 'Immune support.', ingredients: ['Sweet Potato'], instructions: 'Mash.' },
    { id: 's5', name: 'Butternut Squash', cat: 'Sides & Purees', age: '6m+', cal: 60, p: '1g', c: '15g', f: '0g', img: 'https://cdn.loveandlemons.com/wp-content/uploads/2019/10/roasted-butternut-squash-1.jpg', benefits: 'Fiber.', ingredients: ['Squash'], instructions: 'Roast and puree.' },
    { id: 's6', name: 'Green Pea Paste', cat: 'Sides & Purees', age: '6m+', cal: 80, p: '5g', c: '14g', f: '0g', img: 'https://plantbasedonabudget.com/wp-content/uploads/2024/04/Green-Pea-Pasta-PBOAB-Plant-Based-on-a-Budget-14.jpg', benefits: 'Protein.', ingredients: ['Peas'], instructions: 'Boil and blend.' },
    { id: 's7', name: 'Beetroot Creme', cat: 'Sides & Purees', age: '8m+', cal: 50, p: '2g', c: '11g', f: '0g', img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRj2vxq5o-5AVFefh3ZExc56SmKxHo3W1ejJA&s', benefits: 'Folate.', ingredients: ['Beetroot'], instructions: 'Steam and puree.' },
    { id: 's8', name: 'Parsnip Puree', cat: 'Sides & Purees', age: '7m+', cal: 75, p: '1g', c: '18g', f: '0g', img: 'https://www.aheadofthyme.com/wp-content/uploads/2024/09/parsnip-puree.jpg', benefits: 'Potassium.', ingredients: ['Parsnip'], instructions: 'Boil and mash.' },
    { id: 's9', name: 'Zucchini Dip', cat: 'Sides & Purees', age: '6m+', cal: 25, p: '1g', c: '5g', f: '0g', img: 'https://www.simplyrecipes.com/thmb/9OwweE5V7MIR1WxLJTe_77gRO8w=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/Simply-Recipes-Zucchini-Yogurt-Dip-LEAD-3-fb271233654541319912025a9117a740.jpg', benefits: 'Hydration.', ingredients: ['Zucchini'], instructions: 'Steam and blend.' },
    { id: 's12', name: 'Potato & Leek Mash', cat: 'Sides & Purees', age: '9m+', cal: 110, p: '3g', c: '22g', f: '1g', img: 'https://www.eatingwell.com/thmb/swk4J4-wMTPV0ZTPGh8dET3rDzo=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/4525965-982a687752b74b26beaa261a8d40157a.jpg', benefits: 'Prebiotics.', ingredients: ['Potato', 'Leek'], instructions: 'Saute and mash.' },
   
        { id: 's15', name: 'Eggplant Pulp', cat: 'Sides & Purees', age: '1yr+', cal: 35, p: '1g', c: '8g', f: '0g', img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSgK1vE1lTtDTrF-2-ui3Nrd0i5N1LzYHw1ow&s', benefits: 'Antioxidants.', ingredients: ['Eggplant'], instructions: 'Roast and scoop.' },
       { id: 's17', name: 'Tofu Cream', cat: 'Sides & Purees', age: '8m+', cal: 100, p: '10g', c: '3g', f: '6g', img: 'https://www.easychickpeasy.com/wp-content/uploads/2022/11/Vegan-Tofu-Sour-Cream-Recipe-8.jpg', benefits: 'Protein.', ingredients: ['Tofu'], instructions: 'Blend.' },
    { id: 's18', name: 'White Bean Mash', cat: 'Sides & Purees', age: '9m+', cal: 120, p: '7g', c: '22g', f: '1g', img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRKosEFHrhOjEO992lxkoVdDBod-w-DC9aiAA&s', benefits: 'Iron.', ingredients: ['Beans'], instructions: 'Cook and mash.' },
        { id: 's20', name: 'Kale & Pear Mix', cat: 'Sides & Purees', age: '8m+', cal: 70, p: '2g', c: '16g', f: '0g', img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTUh3s_F_1Z-WBkrGNCtZsTsm2OahgpUjfXdw&s', benefits: 'Vitamin K.', ingredients: ['Kale', 'Pear'], instructions: 'Steam and puree.' },

    // --- LUNCH / DINNER (20) ---
    { id: 'l1', name: 'Chicken & Potato', cat: 'Lunch/Dinner', age: '9m+', cal: 180, p: '15g', c: '20g', f: '5g', img: 'https://www.jocooks.com/wp-content/uploads/2024/03/chicken-and-potato-skillet-1-14.jpg', benefits: 'Muscles.', ingredients: ['Chicken'], instructions: 'Boil and mince.' },
    { id: 'l2', name: 'Red Lentil Dahl', cat: 'Lunch/Dinner', age: '8m+', cal: 130, p: '9g', c: '22g', f: '1g', img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQaqgHapDcCPx_8nTVea_8P0KnDc_xGgxZsYA&s', benefits: 'Plant protein.', ingredients: ['Lentils'], instructions: 'Cook mushy.' },
    { id: 'l3', name: 'Salmon & Broccoli', cat: 'Lunch/Dinner', age: '10m+', cal: 210, p: '18g', c: '5g', f: '12g', img: 'https://barefeetinthekitchen.com/wp-content/uploads/2025/04/Glazed-Salmon-and-Brocolli-BFK-9-1-of-1.jpg', benefits: 'Brain fats.', ingredients: ['Salmon'], instructions: 'Steam.' },
    { id: 'l4', name: 'Beef & Carrot Stew', cat: 'Lunch/Dinner', age: '1yr+', cal: 240, p: '20g', c: '15g', f: '10g', img: 'https://www.onceuponachef.com/images/2011/02/beef-stew-with-carrots-potatoes.jpg', benefits: 'Zinc.', ingredients: ['Beef'], instructions: 'Slow cook.' },
    { id: 'l5', name: 'Turkey Risotto', cat: 'Lunch/Dinner', age: '10m+', cal: 190, p: '14g', c: '25g', f: '4g', img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcScu_Mz-0VwjxjvQXdP3THQOEBk9MructpIAg&s', benefits: 'Energy.', ingredients: ['Turkey', 'Rice'], instructions: 'Cook soft.' },
      
    { id: 'l8', name: 'Tofu Veggie Stir', cat: 'Lunch/Dinner', age: '11m+', cal: 150, p: '12g', c: '10g', f: '8g', img: 'https://jessicainthekitchen.com/wp-content/uploads/2022/07/Vegan-Stir-Fry01030.jpg', benefits: 'Proteins.', ingredients: ['Tofu', 'Carrots'], instructions: 'Sauté soft.' },
    { id: 'l9', name: 'Pasta Spinach', cat: 'Lunch/Dinner', age: '1yr+', cal: 220, p: '8g', c: '35g', f: '6g', img: 'https://theclevermeal.com/wp-content/uploads/2020/11/pasta-with-spinach-1.jpg', benefits: 'Energy.', ingredients: ['Pasta', 'Spinach'], instructions: 'Overcook pasta.' },
    { id: 'l10', name: 'Egg Rice Bowl', cat: 'Lunch/Dinner', age: '10m+', cal: 170, p: '9g', c: '24g', f: '5g', img: 'https://www.foodandwine.com/thmb/1KbEybww4KxdvdN2cOUyPwJl2vw=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/Soy-Marinated-Egg-and-Spinach-Rice-Bowl-FT-RECIPE1023-a86bfd1186254c529f30d5bc3f9bfa2b.jpg', benefits: 'Choline.', ingredients: ['Egg', 'Rice'], instructions: 'Mix soft egg in rice.' },
    { id: 'l11', name: 'Cheesy Polenta', cat: 'Lunch/Dinner', age: '11m+', cal: 180, p: '6g', c: '28g', f: '6g', img: 'https://familystylefood.com/wp-content/uploads/2021/09/Parm-Polenta-1.jpg', benefits: 'Calcium.', ingredients: ['Polenta', 'Cheese'], instructions: 'Cook creamy.' },
    { id: 'l12', name: 'Turkey Apple Ball', cat: 'Lunch/Dinner', age: '1yr+', cal: 195, p: '16g', c: '10g', f: '9g', img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQH29saufVqE7eKhfoDRHeiV-FrhxTCkZnEqA&s', benefits: 'Vitamins.', ingredients: ['Turkey', 'Apple'], instructions: 'Bake small balls.' },
    { id: 'l13', name: 'Fish Curry', cat: 'Lunch/Dinner', age: '1yr+', cal: 160, p: '15g', c: '8g', f: '7g', img: 'https://farm8.staticflickr.com/7666/26750981042_08e96693f8_z.jpg', benefits: 'DHA.', ingredients: ['White fish'], instructions: 'Mild spice cook.' },
       { id: 'l15', name: 'Chicken Couscous', cat: 'Lunch/Dinner', age: '10m+', cal: 210, p: '14g', c: '30g', f: '4g', img: 'https://feelgoodfoodie.net/wp-content/uploads/2023/04/Skillet-Chicken-with-Couscous-TIMG.jpg', benefits: 'Carbs.', ingredients: ['Chicken', 'Couscous'], instructions: 'Cook soft.' },
    { id: 'l16', name: 'Veggie Soup', cat: 'Lunch/Dinner', age: '9m+', cal: 140, p: '10g', c: '25g', f: '1g', img: 'https://i0.wp.com/cdn.mylittlemoppet.com/wp-content/uploads/2014/11/Mixed-Vegetable-Soup-for-Babies-Toddlers.jpg?ssl=1', benefits: 'Fiber.', ingredients: ['Lentils', 'Carrots'], instructions: 'Boil soft.' },
       { id: 'l18', name: 'Brown Rice Mash', cat: 'Lunch/Dinner', age: '7m+', cal: 150, p: '4g', c: '32g', f: '1g', img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTlGNyqjkcfeapLMrIOYZburXRE8Q-CBjl2RQ&s', benefits: 'B Vitamins.', ingredients: ['Brown rice'], instructions: 'Overcook and mash.' },
    
        // --- SOFT TREATS (20) ---
       { id: 't2', name: 'Yogurt Drops', cat: 'Soft Treats', age: '9m+', cal: 50, p: '4g', c: '6g', f: '2g', img: 'https://cdn.apartmenttherapy.info/image/upload/f_jpg,q_auto:eco,c_fill,g_auto,w_1500,ar_1:1/k%2Farchive%2Fb1e2a54bbffeaa9207b84ebb68b0e527eb102057', benefits: 'Gut health.', ingredients: ['Yogurt'], instructions: 'Freeze drops.' },
    { id: 't3', name: 'Potato Pancakes', cat: 'Soft Treats', age: '1yr+', cal: 120, p: '4g', c: '20g', f: '3g', img: 'https://images.ctfassets.net/j9gt1m2cyvgh/79oXPEv7zHjCMBVRyFbjtj/6b0ffbf6ce152fc31c01549ba5a20300/492777782_GTY_RF_PotatoPancakes-1.jpg', benefits: 'Energy.', ingredients: ['Potato'], instructions: 'Pan fry.' },
    { id: 't4', name: 'Mango Sorbet', cat: 'Soft Treats', age: '10m+', cal: 60, p: '1g', c: '14g', f: '0g', img: 'https://www.connoisseurusveg.com/wp-content/uploads/2025/07/mango-sorbet-square.jpg', benefits: 'Immunity.', ingredients: ['Mango'], instructions: 'Freeze and blend.' },
    { id: 't5', name: 'Cheese Muffins', cat: 'Soft Treats', age: '1yr+', cal: 150, p: '7g', c: '12g', f: '8g', img: 'https://www.allrecipes.com/thmb/NqtjHXHS6oS319umwOBz6dd8Yzw=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/AR-239856-cheddar-cheese-muffins-ddmfs-2x1-d99179347b254316afb933203a87414b.jpg', benefits: 'Calcium.', ingredients: ['Cheese'], instructions: 'Bake.' },
    { id: 't6', name: 'Blueberry Bars', cat: 'Soft Treats', age: '1yr+', cal: 130, p: '3g', c: '22g', f: '4g', img: 'https://www.allrecipes.com/thmb/rGuxxlbA31QFYKgzPN3iW9l5OeU=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/10462-blueberry-crumb-bars-humblepieliving-003-1x1-1-50c3ea9564cf4012808f23044b6a8499.jpg', benefits: 'Brain health.', ingredients: ['Oats', 'Blueberries'], instructions: 'Bake.' },
    { id: 't7', name: 'Carrot Cookies', cat: 'Soft Treats', age: '1yr+', cal: 110, p: '2g', c: '18g', f: '4g', img: 'https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcS3EixgU6l1Z9Adz8sNI-D2C-PFZv23axvN-P2kLKWcK1as-C_k', benefits: 'Vitamin A.', ingredients: ['Carrots', 'Flour'], instructions: 'Bake soft.' },
       { id: 't9', name: 'Strawberry Jelly', cat: 'Soft Treats', age: '1yr+', cal: 40, p: '1g', c: '10g', f: '0g', img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSck2ViPjK_CWzQk7lcx1ltA698pFgeR9l8vA&s', benefits: 'Vitamin C.', ingredients: ['Strawberries'], instructions: 'Set in fridge.' },
    { id: 't12', name: 'Oatmeal Fingers', cat: 'Soft Treats', age: '1yr+', cal: 105, p: '3g', c: '18g', f: '3g', img: 'https://www.healthylittlefoodies.com/wp-content/uploads/2021/01/porridge-fingers-baby-plate.jpg', benefits: 'Fiber.', ingredients: ['Oats'], instructions: 'Press and bake.' },
    { id: 't13', name: 'Apple Rings', cat: 'Soft Treats', age: '1yr+', cal: 60, p: '0g', c: '15g', f: '0g', img: 'https://static01.nyt.com/images/2014/11/18/science/19recipehealthrings/19recipehealthrings-superJumbo.jpg', benefits: 'Fiber.', ingredients: ['Apple'], instructions: 'Dehydrate soft.' },
    { id: 't14', name: 'Rice Cakes', cat: 'Soft Treats', age: '1yr+', cal: 80, p: '2g', c: '18g', f: '0g', img: 'https://mykoreankitchen.com/wp-content/uploads/2021/03/1.-Garaetteok.jpg', benefits: 'Safe chewing.', ingredients: ['Puffed rice'], instructions: 'Press.' },
    { id: 't15', name: 'Cottage Fruit', cat: 'Soft Treats', age: '1yr+', cal: 110, p: '8g', c: '12g', f: '3g', img: 'https://images.pexels.com/photos/1092730/pexels-photo-1092730.jpeg?auto=compress&cs=tinysrgb&w=500', benefits: 'Calcium.', ingredients: ['Cheese', 'Fruit'], instructions: 'Mix.' },
    { id: 't17', name: 'Plum Jelly', cat: 'Soft Treats', age: '1yr+', cal: 50, p: '0g', c: '12g', f: '0g', img: 'https://www.allrecipes.com/thmb/KCcfNPb7JkZiC1o9Plo0uUKuJYk=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/ALR-275563-plum-jelly-VAT-4x3-4d6df1cdfd8a4b91ae3635d464b1d59c.jpg', benefits: 'Digestion.', ingredients: ['Plums'], instructions: 'Set in fridge.' },
    { id: 't18', name: 'Tofu Nuggets', cat: 'Soft Treats', age: '1yr+', cal: 130, p: '12g', c: '8g', f: '6g', img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRO0dPZVjOCqMKX4yIfQFVeFLeUZNxp1cgJaA&s', benefits: 'Protein.', ingredients: ['Tofu'], instructions: 'Bake crisp.' },
    { id: 't19', name: 'Beet Brownie', cat: 'Soft Treats', age: '1yr+', cal: 140, p: '4g', c: '20g', f: '6g', img: 'https://media-cldnry.s-nbcnews.com/image/upload/newscms/2024_13/2054373/beet-brownies-1x1-zz-240326.jpg', benefits: 'Folate.', ingredients: ['Beetroot'], instructions: 'Bake soft.' },
    { id: 't20', name: 'Date & Oat Balls', cat: 'Soft Treats', age: '1yr+', cal: 115, p: '3g', c: '25g', f: '2g', img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTiFLg94F5Kl61SM8QgOVTWqRLnL91-gMrbsA&s', benefits: 'Energy.', ingredients: ['Dates', 'Oats'], instructions: 'Roll into balls.' }
];

// --- SELF-HEALING RENDERER ---
function renderBabyRecipes(meals) {
    const grid = document.getElementById('recipe-grid');
    if (!grid) return;
    
    // Fallback image URL
    const placeholder = "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=500";

    grid.innerHTML = meals.map(meal => `
        <div class="recipe-card" onclick="openBabyModal('${meal.id}')">
            <div class="cal-badge" style="position:absolute; background:rgba(0,0,0,0.8); color:white; padding:5px 12px; border-radius:20px; margin:15px; font-size:12px;">${meal.cal} kcal</div>
            <img src="${meal.img}" 
                 alt="${meal.name}" 
                 onerror="this.onerror=null;this.src='${placeholder}';" 
                 style="width:100%; height:220px; object-fit:cover; border-bottom:1px solid #eee;">
            <div style="padding:15px;">
                <span class="baby-tag" style="background:var(--accent); color:white; padding:4px 10px; border-radius:15px; font-size:11px;">${meal.age}</span>
                <h3 style="margin:12px 0; font-size:1.1rem;">${meal.name}</h3>
                <div class="macros-strip" style="display:flex; justify-content:space-between; font-size:13px; background:#f8fafc; padding:8px; border-radius:10px;">
                    <span>P: <b>${meal.p}</b></span>
                    <span>C: <b>${meal.c}</b></span>
                    <span>F: <b>${meal.f}</b></span>
                </div>
            </div>
        </div>
    `).join('');
}
const moodConfigs = {
    'happy': { bg: '#fefce8', accent: '#eab308', sidebar: '#854d0e', voice: "Feeling Happy! Let's cook something bright." },
    'sad':   { bg: '#eff6ff', accent: '#3b82f6', sidebar: '#1e3a8a', voice: "It's okay to feel down. Let's make something comforting." },
    'lazy':  { bg: '#fdf2f8', accent: '#ec4899', sidebar: '#831843', voice: "Low effort, high reward. I got you." },
    'angry': { bg: '#fef2f2', accent: '#ef4444', sidebar: '#7f1d1d', voice: "Take a deep breath. Let's focus on a great meal." },
    'reset': { bg: '#f1f5f9', accent: '#a855f7', sidebar: '#4840a1', voice: "System reset to default." }
};

// --- DYNAMIC COLOR ENGINE ---
function applyMood(moodKey) {
    const config = moodConfigs[moodKey];
    if (!config) return;

    // Apply colors to CSS Variables
    document.documentElement.style.setProperty('--mood-bg', config.bg);
    document.documentElement.style.setProperty('--mood-color', config.accent);
    document.documentElement.style.setProperty('--mood-sidebar', config.sidebar);

    // Trigger the Lab Voice
    if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
        const msg = new SpeechSynthesisUtterance(config.voice);
        msg.pitch = 1.2; 
        msg.rate = 0.9;
        window.speechSynthesis.speak(msg);
    }
}
// --- CORE FUNCTIONS ---

function renderBabyRecipes(meals) {
    const grid = document.getElementById('recipe-grid');
    if (!grid) return;
    grid.innerHTML = meals.map(meal => `
        <div class="recipe-card" onclick="openBabyModal('${meal.id}')">
            <div class="cal-badge" style="position:absolute; background:rgba(0,0,0,0.8); color:white; padding:5px 12px; border-radius:20px; margin:15px; font-size:12px; border:1px solid rgba(255,255,255,0.2);">${meal.cal} kcal</div>
            <img src="${meal.img}" alt="${meal.name}" style="width:100%; height:220px; object-fit:cover; border-bottom:1px solid #eee;" loading="lazy">
            <div style="padding:15px;">
                <span class="baby-tag" style="background:var(--accent); color:white; padding:4px 10px; border-radius:15px; font-size:11px; font-weight:700;">${meal.age}</span>
                <h3 style="margin:12px 0; font-size:1.1rem; color:#1e293b;">${meal.name}</h3>
                <div class="macros-strip" style="display:flex; justify-content:space-between; font-size:13px; color:#64748b; background:#f8fafc; padding:8px; border-radius:10px;">
                    <span>P: <b>${meal.p}</b></span>
                    <span>C: <b>${meal.c}</b></span>
                    <span>F: <b>${meal.f}</b></span>
                </div>
            </div>
        </div>
    `).join('');
}

function filterBaby(category, event) {
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
    const filtered = babyMealsDB.filter(m => m.cat === category);
    renderBabyRecipes(filtered);
}

function searchBabyMeals() {
    const q = document.getElementById('baby-search').value.toLowerCase();
    const filtered = babyMealsDB.filter(m => 
        m.name.toLowerCase().includes(q) || 
        m.ingredients.some(ing => ing.toLowerCase().includes(q))
    );
    renderBabyRecipes(filtered);
}

function openBabyModal(id) {
    const meal = babyMealsDB.find(m => m.id === id);
    if (typeof speakMood === 'function') speakMood(`Analyzing ${meal.name}. This meal provides ${meal.benefits}`);
    
    document.getElementById('modal-body').innerHTML = `
        <div style="display:flex; gap:25px; flex-wrap:wrap;">
            <img src="${meal.img}" style="width:100%; max-width:450px; border-radius:20px; box-shadow: 0 10px 15px -3px rgba(0,0,0,0.1);">
            <div style="flex:1; border:4px solid #000; padding:20px; background:#fff;">
                <h2 style="margin:0; border-bottom:10px solid #000; font-size:2.2rem; text-transform:uppercase;">Molecular Data</h2>
                <div style="font-size:1.2rem; line-height:2;">
                    <p style="border-bottom:2px solid #000;">Calories: <span style="float:right;">${meal.cal}</span></p>
                    <p style="border-bottom:2px solid #000;">Protein: <span style="float:right;">${meal.p}</span></p>
                    <p style="border-bottom:2px solid #000;">Carbs: <span style="float:right;">${meal.c}</span></p>
                    <p style="border-bottom:10px solid #000;">Total Fat: <span style="float:right;">${meal.f}</span></p>
                </div>
            </div>
        </div>
        <div style="background:#ecfdf5; border-left:6px solid #10b981; padding:20px; margin:25px 0; border-radius:10px;">
            <strong style="color:#065f46; font-size:1.1rem;">🧪 Growth Benefit Analysis:</strong> 
            <p style="margin-top:5px; color:#065f46;">${meal.benefits}</p>
        </div>
        <h3 style="color:#1e293b;">Required Ingredients</h3>
        <ul style="column-count: 2; color:#475569;">${meal.ingredients.map(i => `<li>${i}</li>`).join('')}</ul>
        <h3 style="color:#1e293b;">Molecular Synthesis (Instructions)</h3>
        <p style="background:#f8fafc; padding:20px; border-radius:15px; border:1px solid #e2e8f0; color:#475569;">${meal.instructions}</p>
    `;
    document.getElementById('recipe-modal').style.display = 'block';
}

function closeModal() {
    document.getElementById('recipe-modal').style.display = 'none';
    if(window.speechSynthesis) window.speechSynthesis.cancel();
}

// Auto-init
document.addEventListener('DOMContentLoaded', () => {
    renderBabyRecipes(babyMealsDB);
});
