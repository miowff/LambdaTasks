export function CahatIdStateDictionary()
{
    this.data = [];

    this.add = function(key,value)
    {
        if(key && value)
        {
            this.data.push({key:key,value:value});
        }
        return this.data;
    }

    this.removeAt = function(key)
    {
        for(var i = 0; i < this.data.length; i++ )
        {
            if(this.data[i].key === key)
            {
                this.data.splice(this.data[i],1);
                return this.data;
            }
        }
        return this.data;
    }

    this.findAt = function(key)
    {
        for(var i = 0; i < this.data.length; i++)
        {
            if(this.data[i].key == key)
            {
                return this.data[i].value;
            }
        }
        return null;
    }
    this.changeState = function(key,state)
    {
        for(var i = 0; i < this.data.length; i++)
        {
            if(this.data[i].key == key)
            {
                this.data[i].value = state;
                return this.data;
            }
        }
        return this.data;
    }

}