import FullList from "../model/FullList";

interface DOMList{
    ul:HTMLUListElement,
    clear():void,
    render(fullList:FullList):void
} 

export default class ListTemplate implements DOMList{

    static instance:ListTemplate = new ListTemplate()

    ul:HTMLUListElement

    private constructor() {
        this.ul = document.getElementById("listItems") as HTMLUListElement
    }

    clear():void{
        this.ul.innerHTML = "";
        this.toggleEmptyState(true);
    }

    private toggleEmptyState(show: boolean):void {
        const emptyState = document.getElementById("emptyState");
        if(emptyState) {
            emptyState.classList.toggle("hidden", !show);
        }
    }

render(fullList:FullList):void{
    this.ul.innerHTML = "";
    
    if(fullList.list.length === 0) {
        this.toggleEmptyState(true);
        return;
    }
    
    this.toggleEmptyState(false);
    
    fullList.list.forEach(item => {
        const li = document.createElement("li") as HTMLLIElement
        li.className = "group hover:bg-gray-50 transition-colors"
        
        // Container div for better layout
        const container = document.createElement("div") as HTMLDivElement
        container.className = "flex items-center gap-3 sm:gap-4 px-4 sm:px-6 py-3 sm:py-4"
        
        // Checkbox
        const check = document.createElement("input") as HTMLInputElement
        check.type = "checkbox"
        check.id = item.id
        check.tabIndex = 0
        check.checked = item.checked
        check.className = "w-5 h-5 sm:w-6 sm:h-6 text-indigo-600 border-2 border-gray-300 rounded focus:ring-2 focus:ring-indigo-500 focus:ring-offset-0 cursor-pointer transition-all flex-shrink-0"
        
        check.addEventListener("change", () => {
            item.checked = !item.checked
            fullList.save();
            label.classList.toggle("line-through", item.checked);
            label.classList.toggle("text-gray-400", item.checked);
        })
        
        // Label
        const label = document.createElement("label") as HTMLLabelElement
        label.htmlFor = item.id
        label.textContent = item.item
        label.className = `flex-1 cursor-pointer select-none text-sm sm:text-base text-gray-700 break-words ${item.checked ? 'line-through text-gray-400' : ''}`
        
        // Delete button
        const button = document.createElement("button") as HTMLButtonElement
        button.className = "sm:opacity-0 sm:group-hover:opacity-100 text-gray-400 hover:text-red-600 hover:bg-red-50 p-2 rounded-lg transition-all flex-shrink-0"
        button.innerHTML = `
            <svg class="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
        `
        button.title = "Delete task"
        
        button.addEventListener("click", () => {
            // Add fade out animation
            li.style.transition = "opacity 0.3s ease-out"
            li.style.opacity = "0"
            
            setTimeout(() => {
                fullList.removeItem(item.id)
                this.render(fullList)
            }, 300)
        })
        
        container.append(check, label, button)
        li.append(container)
        this.ul.append(li)
    })
}
}