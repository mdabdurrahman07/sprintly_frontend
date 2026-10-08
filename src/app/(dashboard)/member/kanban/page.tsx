import { KanbanView } from '@/components/Modules/Kanban/KanbanView';
import React from 'react';

const memberKanbanPage = () => {
    return (
        <div>
            <KanbanView createProjectHref="/manager/projects"></KanbanView>
        </div>
    );
};

export default memberKanbanPage;